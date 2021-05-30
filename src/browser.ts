import { Main } from "./main";
import { FrameRequestConfig } from "./models/frame-extractor.model";
import { FramoImageExtension } from "./models/generic-ffmpeg.model";
import { FfmpegService } from "./services/ffmpeg.service";
import { FrameExtractorService } from "./services/frame-extractor.service";
export { FrameRequestConfig, FramoImageExtension };

export class Framo {
  ffmpegService = FfmpegService.getInstance();
  frameExtractorService = FrameExtractorService.getInstance();
  main = new Main();

  /**
   * @description Initialize Framo and its dependencies
   */
  initializeFramo = (): Promise<void> => this.main.initializeFramo();

  /**
   * @description Extract frames from a video at specific times or regular intervals
   */
  extractFrames = (config: FrameRequestConfig): Promise<Blob[]> =>
    this.main.initializationGuard().extractFrames(config);

  /**
   * @description Emits the progress of the operation
   * @event
   */
  progress = this.ffmpegService.progress;
}
