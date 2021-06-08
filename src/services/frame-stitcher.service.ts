import { StitchFramesRequestConfig } from "../models/frame-stitcher.model";
import { SingleOutputParametersResponse } from "../models/generic.model";
import { Utility } from "../utility/utility";
import { FfmpegService } from "./ffmpeg.service";

const totalDigitsInFilename = 6;
const outputFPS = 30;

export class FrameStitcherService {
  ffmpegService = FfmpegService.getInstance();

  private static instance: FrameStitcherService;

  public static getInstance(): FrameStitcherService {
    if (!FrameStitcherService.instance) {
      FrameStitcherService.instance = new FrameStitcherService();
    }

    return FrameStitcherService.instance;
  }

  stitchFrames = async (config: StitchFramesRequestConfig): Promise<Blob> => {
    try {
      const inputFilenames = config.files.map((_, index: number) => Utility.getFilenameWithPadding(index, 'in', totalDigitsInFilename, config.inputExtension));
      const inputFilenameTemplate = `in_%0${totalDigitsInFilename}d.${config.inputExtension}`;
      await Promise.all(this.ffmpegService.fetchFiles(config.files, inputFilenames));
      const { parameters, outputFilename } = this.getParameters(config, inputFilenameTemplate);
      await this.ffmpegService.ffmpeg.run(...parameters);

      const data = this.ffmpegService.ffmpeg.FS("readFile", outputFilename);
      return new Blob([data.buffer]);
    } catch (error) {
      throw new Error(error)
    }
  }

  getParameters = (config: StitchFramesRequestConfig, inputFilenameTemplate: string): SingleOutputParametersResponse => {
    const outputFilename = `out_${config.videoExtension}`;
    const framerate = config.frameDuration ? (1 / config.frameDuration).toFixed(2) : outputFPS;
    const inParameters = ['-framerate', `${framerate}`, '-i', inputFilenameTemplate, '-r', `${outputFPS}`, '-pix_fmt', 'yuv420p'];
    const outParameters = [outputFilename];
    const auxillaryParameters = ["-y"];

    const response: SingleOutputParametersResponse = {
      parameters: [...inParameters, ...outParameters, ...auxillaryParameters],
      outputFilename,
    };
    return response;
  }
}
