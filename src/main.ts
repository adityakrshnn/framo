import { ERROR_MESSAGES } from "./constants/constants";
import { FilmstripRequestConfig } from "./models/filmstrip.model";
import { FrameRequestConfig } from "./models/frame-extractor.model";
import { FfmpegService } from "./services/ffmpeg.service";
import { FilmstripService } from "./services/filmstrip.service";
import { FrameExtractorService } from "./services/frame-extractor.service";

export class Main {
  ffmpegService = FfmpegService.getInstance();
  frameExtractorService = FrameExtractorService.getInstance();
  filmstripService = FilmstripService.getInstance();

  initializationGuard(): Main {
    if (!this.ffmpegService.isReady) {
      throw new Error(ERROR_MESSAGES.FRAMO_NOT_INITIALIZED);
    }

    return this;
  }

  initializeFramo = (): Promise<void> => this.ffmpegService.initializeFramo();

  extractFrames = (config: FrameRequestConfig): Promise<Blob[]> => this.frameExtractorService.extractFrames(config);

  makeFilmstrip = (config: FilmstripRequestConfig): Promise<Blob> => this.filmstripService.makeFilmstrip(config);
}
