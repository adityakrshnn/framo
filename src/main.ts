import { ERROR_MESSAGES } from "./constants/constants";
import { FilmstripRequestConfig } from "./models/filmstrip.model";
import { ExtractFramesRequestConfig } from "./models/frame-extractor.model";
import { StitchFramesRequestConfig } from "./models/frame-stitcher.model";
import { FfmpegService } from "./services/ffmpeg.service";
import { FilmstripService } from "./services/filmstrip.service";
import { FrameExtractorService } from "./services/frame-extractor.service";
import { FrameStitcherService } from "./services/frame-stitcher.service";

export class Main {
  ffmpegService = FfmpegService.getInstance();
  frameExtractorService = FrameExtractorService.getInstance();
  filmstripService = FilmstripService.getInstance();
  frameStitcherService = FrameStitcherService.getInstance();

  initializationGuard(): Main {
    if (!this.ffmpegService.isReady) {
      throw new Error(ERROR_MESSAGES.FRAMO_NOT_INITIALIZED);
    }

    return this;
  }

  initializeFramo = (): Promise<void> => this.ffmpegService.initializeFramo();

  extractFrames = (config: ExtractFramesRequestConfig): Promise<Blob[]> => this.frameExtractorService.extractFrames(config);

  makeFilmstrip = (config: FilmstripRequestConfig): Promise<Blob> => this.filmstripService.makeFilmstrip(config);

  stitchFrames = (config: StitchFramesRequestConfig): Promise<Blob> => this.frameStitcherService.stitchFrames(config);
}
