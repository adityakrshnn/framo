import { FRAMO_NOT_INITIALIZED } from "./constants/constants";
import { FrameRequestConfig } from "./models/frame-extractor.model";
import { FfmpegService } from "./services/ffmpeg.service";
import { FrameExtractorService } from "./services/frame-extractor.service";

export class Main {
  ffmpegService = FfmpegService.getInstance();
  frameExtractorService = FrameExtractorService.getInstance();

  initializationGuard(): Main {
    if (!this.ffmpegService.isReady) {
      throw new Error(FRAMO_NOT_INITIALIZED);
    }

    return this;
  }

  initializeFramo = (): Promise<void> => this.ffmpegService.initializeFramo();

  extractFrames = (config: FrameRequestConfig): Promise<Blob[]> => this.frameExtractorService.extractFrames(config);
}
