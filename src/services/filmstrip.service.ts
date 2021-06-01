import { FilmstripParametersResponse, FilmstripRequestConfig } from "../models/filmstrip.model";
import { Mediainfo } from "../models/mediainfo.model";
import { Utility } from "../utility/utility";
import { FfmpegService } from "./ffmpeg.service";

export class FilmstripService {
  ffmpegService = FfmpegService.getInstance();

  private static instance: FilmstripService;

  public static getInstance(): FilmstripService {
    if (!FilmstripService.instance) {
      FilmstripService.instance = new FilmstripService();
    }

    return FilmstripService.instance;
  }

  makeFilmstrip = async (config: FilmstripRequestConfig): Promise<Blob> => {
    try {
      const fileBlob: Blob = await this.ffmpegService.fetchFile(config.filename, config.file);
      const mediainfo: Mediainfo = await this.ffmpegService.getMediaInfo(fileBlob);
      const { parameters, outputFilename } = this.getParameters(config, mediainfo);
      await this.ffmpegService.ffmpeg.run(...parameters);

      const data = this.ffmpegService.ffmpeg.FS("readFile", outputFilename);
      return new Blob([data.buffer]);
    } catch (error) {
      throw new Error(error)
    }
  }

  getParameters = (config: FilmstripRequestConfig, mediainfo: Mediainfo): FilmstripParametersResponse => {
    const auxillaryParameters = ["-y"];
    let parametersResponse: FilmstripParametersResponse = {
      parameters: [],
      outputFilename: '',
    };

    parametersResponse = this.getTimeIntervalBasedParameters(config, mediainfo)

    const response: FilmstripParametersResponse = {
      parameters: [...parametersResponse.parameters, ...auxillaryParameters],
      outputFilename: parametersResponse.outputFilename,
    };
    return response;
  }

  getTimeIntervalBasedParameters = (config: FilmstripRequestConfig, mediainfo: Mediainfo): FilmstripParametersResponse => {
    const outputFilename = Utility.getOutputFilename(1, config.outputExtension);
    const duration = Utility.getVideoDuration(mediainfo);
    const totalFramesInFilmstrip = Math.floor(duration / config.timeInterval!);
    const selectTime = `select=not(mod(n\\,${config.timeInterval!})),`;
    const scale = config.resolution ? `${Utility.getScale(config.resolution)},` : '';
    const tiles = Utility.getFilmstripTileString(totalFramesInFilmstrip, config.orientation);
    const vfString = `${selectTime}${scale}${tiles}`

    const inParameters: string[] = ['-i', config.filename, '-frames', '1', '-vf', vfString];
    const outParameters: string[] = [outputFilename];

    const response: FilmstripParametersResponse = {
      parameters: [...inParameters, ...outParameters],
      outputFilename,
    };
    return response;
  }
}
