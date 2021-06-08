import { FramoImageExtension, FramoResolution, FramoVideoExtension } from "./generic.model";

export interface StitchFramesRequestConfig {
  /** @description File in the form of File, base64 string, Blob, ArrayBuffer, or url */
  files: (File | Blob | ArrayBuffer | string)[];
  /** @description Input file extension @example png*/
  inputExtension: FramoImageExtension;
  /** @description Mention the extension of the final video */
  videoExtension: FramoVideoExtension;
  /** @description Duration for each frame in seconds*/
  frameDuration?: number;
  /** @description Change the resolution of final video */
  resolution?: FramoResolution;
}
