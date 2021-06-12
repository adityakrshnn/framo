import { FilmstripOrientation, FilmstripRequestConfig } from "../models/filmstrip.model";
import { FramoImageExtension, FramoResolution } from "../models/generic.model";
import { Mediainfo } from "../models/mediainfo.model";

export class Utility {
  static getScale(dimensions: FramoResolution): string {
    if (!dimensions.height && !dimensions.width) {
      return '';
    }

    return `scale=${dimensions.width ?? -2}:${dimensions.height ?? -2}`;
  }

  static getFrameCount(mediainfoResult: Mediainfo): number {
    return parseInt(mediainfoResult.media?.track[0]?.FrameCount ?? 0, 10);
  }

  static getVideoDuration(mediainfoResult: Mediainfo): number {
    return parseFloat(mediainfoResult.media?.track[0]?.Duration ?? '0');
  }

  static getOutputFilename(index: number, extension: FramoImageExtension): string {
    return `out_${index}_${Date.now()}.${extension}`;
  }

  static getFilmstripTileString(totalFramesInFilmstrip: number, config: FilmstripRequestConfig): string {
    let tileString = `tile=`;

    if (config.orientation === FilmstripOrientation.HORIZONTAL) {
      tileString += `${totalFramesInFilmstrip}x1`;
    } else {
      tileString += `1x${totalFramesInFilmstrip}`;
    }

    if (config.padding) {
      tileString += `:padding=${config.padding}`;
    }

    if (config.margin) {
      tileString += `:margin=${config.margin}`;
    }

    if (config.color) {
      tileString += `:color=${config.color}`;
    }

    if (config.initPadding) {
      tileString += `:init_padding=${config.initPadding}`;
    }
    return tileString;
  }

  static getFilenameWithPadding(index: number, prefix: string, totalDigitsInFilename: number, extension: FramoImageExtension): string {
    const filenumber = index.toString().padStart(totalDigitsInFilename, "0");
    return `${prefix}_${filenumber}.${extension}`;
  }
}
