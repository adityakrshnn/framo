import { Main } from "./main";
import { FrameRequestConfig } from "./models/frame-extractor.model";
import { FramoImageExtension } from "./models/generic-ffmpeg.model";
import { FfmpegService } from "./services/ffmpeg.service";
export { FrameRequestConfig, FramoImageExtension };

export class Framo {
  private _ffmpegService = FfmpegService.getInstance();
  private _main = new Main();

  /**
   * @description Initialize Framo and its dependencies
   */
  initializeFramo = (): Promise<void> => this._main.initializeFramo();

  /**
   * @description Extract frames from a video at specific times or regular intervals
   */
  extractFrames = (config: FrameRequestConfig): Promise<Blob[]> =>
    this._main.initializationGuard().extractFrames(config);

  /**
   * @description Emits the progress of the operation
   * @event
   */
  progress = this._ffmpegService.progress;
}
