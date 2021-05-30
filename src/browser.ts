/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */

import {
  FrameRequestConfig,
} from "./models/frame-extractor.model";
import { FramoImageExtension } from "./models/generic-ffmpeg.model";
import { FfmpegService } from "./services/ffmpeg.service";
import { FrameExtractorService } from "./services/frame-extractor.service";

const ffmpegService = FfmpegService.getInstance();
const frameExtractorService = FrameExtractorService.getInstance();
ffmpegService.initializeFfmpeg();

export { FrameRequestConfig, FramoImageExtension };

/**
 * @description Extract frames from a video at specific times or regular intervals
 */
export const extractFrames = frameExtractorService.extractFrames;

/**
 * @description Emits the progress of the operation
 * @event
 */
export const progress = ffmpegService.progress;
