import { FramoDimension, FramoImageExtension } from "./generic-ffmpeg.model";

export enum FrameExtractorFileType {
  URL = "url",
  FILE = "file",
}

export interface FrameRequestConfig {
  file: File;
  extension: FramoImageExtension;
  interval?: number;
  timePoints?: string[];
  dimensions?: FramoDimension;
}

export interface FrameExtractionParametersResponse {
  parameters: string[];
  outputFilenames: string[];
}
