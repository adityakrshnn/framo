import { FramoDimension } from "../models/generic-ffmpeg.model";

export class Utility {
  static getScale(dimensions: FramoDimension): string {
    if (!dimensions.height && !dimensions.width) {
      return '';
    }

    return `scale=${dimensions.width ?? -2}:${dimensions.height ?? -2}`;
  }
}
