/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */

import { FrameRequestConfig, FrameExtractorFileType } from "./models/frame-extractor.model";
import { FfmpegService } from "./services/ffmpeg.service";
import { FrameExtractorService } from "./services/frame-extractor.service";

const ffmpegService = FfmpegService.getInstance()
const frameExtractorService = FrameExtractorService.getInstance();
ffmpegService.initializeFfmpeg();
export const extractFrames = frameExtractorService.extractFrames;
export const fetchFile = ffmpegService.fetchFile;
export { FrameRequestConfig, FrameExtractorFileType };
export const progress = ffmpegService.progress;
