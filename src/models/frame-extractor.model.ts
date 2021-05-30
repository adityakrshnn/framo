import { FramoDimension as FramoResolution, FramoImageExtension } from "./generic-ffmpeg.model";

export enum FrameExtractorFileType {
  URL = "url",
  FILE = "file",
}

export interface FrameRequestConfig {
  file: File;
  /** Mention the image extension of the frame output */
  extension: FramoImageExtension;
  /** Frames at regular time intervals in seconds */
  interval?: number;
  /** Frames at specific time points in on of ffmpeg's accepted formats https://trac.ffmpeg.org/wiki/Seeking#:~:text=starting%20at%20120s.-,Time%20unit%20syntax,%22%2C%20not%20as%20frame%205. */
  timePoints?: string[];
  /** Change the resolution of the final output */
  resolution?: FramoResolution;
}

export interface FrameExtractionParametersResponse {
  parameters: string[];
  outputFilenames: string[];
}
