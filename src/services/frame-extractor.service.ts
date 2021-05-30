import { FrameRequestConfig, FrameExtractionParametersResponse } from "../models/frame-extractor.model";
import { FramoImageExtension } from "../models/generic-ffmpeg.model";
import { Utility } from "../utility/utility";
import { FfmpegService } from "./ffmpeg.service";

const outputFilePrefix = "out";
const outputFileDigits = 6;

export class FrameExtractorService {
  ffmpegService = FfmpegService.getInstance();

  private static instance: FrameExtractorService;

  public static getInstance(): FrameExtractorService {
    if (!FrameExtractorService.instance) {
      FrameExtractorService.instance = new FrameExtractorService();
    }

    return FrameExtractorService.instance;
  }

  extractFrames = async (config: FrameRequestConfig): Promise<Blob[]> => {
    await this.ffmpegService.fetchFile(config.filename, config.file);
    const { parameters, outputFilenames } = await this.getParameters(config);
    await this.ffmpegService.ffmpeg.run(...parameters);

    const blobs = outputFilenames.map((filename) => {
      const data = this.ffmpegService.ffmpeg.FS("readFile", filename);
      return new Blob([data.buffer]);
    });

    return blobs;
  };

  async getParameters(
    config: FrameRequestConfig
  ): Promise<FrameExtractionParametersResponse> {
    const auxillaryParameters = ["-y"];
    let parametersResponse: FrameExtractionParametersResponse = {
      parameters: [],
      outputFilenames: [],
    };

    if (config.timePoints) {
      parametersResponse = this.getTimeBasedParameters(config);
    } else if (config.interval) {
      parametersResponse = await this.getIntervalBasedParameters(config);
    }

    const response: FrameExtractionParametersResponse = {
      parameters: [...parametersResponse.parameters, ...auxillaryParameters],
      outputFilenames: parametersResponse.outputFilenames,
    };
    return response;
  }

  getTimeBasedParameters(config: FrameRequestConfig): FrameExtractionParametersResponse {
    const inParameters: string[] = [];
    const outParameters: string[] = [];
    const outputFilenames: string[] = [];
    const scale = config.resolution ? Utility.getScale(config.resolution) : '';

    config.timePoints?.forEach((timePoint, index) => {
      inParameters.push(
        ...this.getSingleTimeBasedParameter(timePoint, config.filename)
      );
      const outputFilename = this.getOutputFilename(index, config.outputExtension);
      outputFilenames.push(outputFilename);
      outParameters.push(
        ...this.getOutputMappingParameter(index, outputFilename, scale)
      );
    });

    const response: FrameExtractionParametersResponse = {
      parameters: [...inParameters, ...outParameters],
      outputFilenames,
    };
    return response;
  }

  getSingleTimeBasedParameter(time: string, filename: string): string[] {
    return ["-ss", `${time}`, "-i", filename];
  }

  getOutputMappingParameter(index: number, outputFilename: string, scale: string) {
    const outputMapping = ["-map", `${index}:v`, "-frames:v", "1"];

    if (scale) {
      outputMapping.push(...['-vf', scale]);
    }

    outputMapping.push(outputFilename);
    return outputMapping;
  }

  getOutputFilename(index: number, extension: FramoImageExtension) {
    return `out_${index}_${Date.now()}.${extension}`;
  }

  getOutputFilenameForIntervalBasedParameters(index: number, extension: FramoImageExtension) {
    const filenumber = index.toString().padStart(outputFileDigits, "0");
    return `out_${filenumber}.${extension}`;
  }

  async getIntervalBasedParameters(
    config: FrameRequestConfig
  ): Promise<FrameExtractionParametersResponse> {
    const videoDuration = await this.getVideoDuration(config.file);
    const interval = config.interval!;
    const rate = (1 / interval ?? 1).toFixed(2);
    const scale = config.resolution ? Utility.getScale(config.resolution) : '';
    const inParameters = this.getInParametersForIntervalBasedExtraction(config.filename, rate, scale);
    const outParameters: string[] = [`out_%0${outputFileDigits}d.${config.outputExtension}`];
    const outputFilenames: string[] = [];

    for (let i = interval, j = 1; i <= videoDuration; i += interval, j++) {
      const outputFilename = this.getOutputFilenameForIntervalBasedParameters(j, config.outputExtension);
      outputFilenames.push(outputFilename);
    }

    const response: FrameExtractionParametersResponse = {
      parameters: [...inParameters, ...outParameters],
      outputFilenames,
    };

    return response;
  }

  getVideoDuration(file: File | Blob | ArrayBuffer | string): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };

      video.onerror = (error) => {
        reject(error);
      };

      video.src = typeof(file) === 'string' ? file : URL.createObjectURL(file);
    });
  }

  getOutputFilenamesForIntervalBasedParameters(
    interval: number,
    videoDuration: number,
    extension: FramoImageExtension
  ) {
    const filenames: string[] = [];
    const numberOfFrames = videoDuration / interval;
    for (let i = 1; i <= numberOfFrames; i++) {
      const filenumber = i.toString().padStart(outputFileDigits, "0");
      filenames.push(`${outputFilePrefix}_${filenumber}.${extension}`);
    }

    return filenames;
  }

  getInParametersForIntervalBasedExtraction(filename: string, rate: string, scale: string) {
    let inParameters: string[] = ['-i', filename, '-vf'];

    if (scale) {
      inParameters.push(`fps=${rate},${scale}`);
    } else {
      inParameters.push(`fps=${rate}`);
    }

    return inParameters;
  }
}
