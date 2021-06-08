export enum FramoImageExtension {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  BMP = 'bmp',
}

export enum FramoVideoExtension {
  MP4 = 'mp4',
  WEBM = 'webm',
}

export interface FramoResolution {
  width?: number;
  height?: number;
}

export interface Progress {
  duration: number;
  ratio: number;
}

export interface SingleOutputParametersResponse {
  parameters: string[];
  outputFilename: string;
}
