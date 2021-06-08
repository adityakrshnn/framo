import { FramoResolution, FramoImageExtension } from "./generic.model";

export interface ExtractFramesRequestConfig {
  /** @description File in the form of File, base64 string, Blob, ArrayBuffer, or url */
  file: File | Blob | ArrayBuffer | string;
  /** @description Input filename with correct extension @example input.mp4*/
  filename: string;
  /** @description Mention the image extension of the frame output */
  outputExtension: FramoImageExtension;
  /** @description Frames at regular time intervals in seconds */
  timeInterval?: number;
  /** @description Frames at specific time points in ffmpeg's accepted formats https://trac.ffmpeg.org/wiki/Seeking#:~:text=starting%20at%20120s.-,Time%20unit%20syntax,%22%2C%20not%20as%20frame%205. */
  timePoints?: string[];
  /** @description Change the resolution of the final output */
  resolution?: FramoResolution;
}

export interface ExtractFramesParametersResponse {
  parameters: string[];
  outputFilenames: string[];
}
