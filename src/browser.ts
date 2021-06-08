import { Main } from "./main";
import { FilmstripOrientation, FilmstripRequestConfig } from "./models/filmstrip.model";
import { ExtractFramesRequestConfig } from "./models/frame-extractor.model";
import { StitchFramesRequestConfig } from "./models/frame-stitcher.model";
import { FramoImageExtension, FramoVideoExtension, Progress } from "./models/generic.model";
import { FfmpegService } from "./services/ffmpeg.service";
export { ExtractFramesRequestConfig as FrameRequestConfig, FramoImageExtension, FramoVideoExtension, Progress, FilmstripOrientation, FilmstripRequestConfig, StitchFramesRequestConfig };

export class Framo {
  private _ffmpegService = FfmpegService.getInstance();
  private _main = new Main();

  /**
   * @description Initialize Framo and its dependencies
   */
  initializeFramo = (): Promise<void> => this._main.initializeFramo();

  /**
   * @description Extract frames from a video at specific times or regular intervals
   * @param config
   * @returns
   */
  extractFrames = (config: ExtractFramesRequestConfig): Promise<Blob[]> =>
    this._main.initializationGuard().extractFrames(config);

  /**
   * @description Make a filmstrip using frames at regular intervals
   * @param config
   * @returns
   */
  makeFilmstrip = (config: FilmstripRequestConfig): Promise<Blob> =>
    this._main.initializationGuard().makeFilmstrip(config);

  /**
   * @description Stitch frames to make video
   * @param config
   * @returns
   */
  stitchFrames = (config: StitchFramesRequestConfig): Promise<Blob> =>
    this._main.initializationGuard().stitchFrames(config);

  /**
   * @description Emits that framo is ready
   * @event
   */
  progress = this._ffmpegService.progress;

  /**
   * @description Emits the progress of the operation
   * @event
   */
  ready = this._ffmpegService.ready;
}
