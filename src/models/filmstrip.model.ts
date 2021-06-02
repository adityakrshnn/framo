import { FramoImageExtension, FramoResolution } from "./generic.model";

export interface FilmstripRequestConfig {
  /** @description File in the form of File, base64 string, Blob, ArrayBuffer, or url */
  file: File | Blob | ArrayBuffer | string;
  /** @description Input filename with correct extension @example input.mp4*/
  filename: string;
  /** @description Mention the image extension of the filmstrip */
  outputExtension: FramoImageExtension;
  /** @description Mention Filmstrip orientation */
  orientation: FilmstripOrientation,
  /** @description Frames at regular time intervals in seconds */
  timeInterval: number;
  /** @description Space between 2 frames */
  padding?: number;
  /** @description Space between frame and edge */
  margin?: number;
  /** @description Colour of empty space */
  color?: string;
  /** @description Number of frames to initially be empty before displaying first output frame */
  initPadding?: number;
  // /** @description Frames at regular frame intervals */
  // frameInterval?: number;
  /** @description Change the resolution of individual frames */
  resolution?: FramoResolution;
}

export interface FilmstripParametersResponse {
  parameters: string[];
  outputFilename: string;
}

export enum FilmstripOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}
