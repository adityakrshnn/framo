export enum FramoImageExtension {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  BMP = 'bmp',
}

export interface FramoResolution {
  width?: number;
  height?: number;
}

export interface Progress {
  duration: number;
  ratio: number;
}
