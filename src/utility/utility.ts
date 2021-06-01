import { ERROR_MESSAGES, REGEX } from "../constants/constants";
import { FilmstripOrientation } from "../models/filmstrip.model";
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
    return parseInt(mediainfoResult.media?.track[0]?.FrameCount, 10) ?? 0;
  }

  static getVideoDuration(mediainfoResult: Mediainfo): number {
    return parseFloat(mediainfoResult.media?.track[0]?.Duration) ?? 0.0;
  }

  static parseMediainfoResultForFramerate(mediainfoResult: string): number {
    const positionOfFramerate = mediainfoResult.indexOf('Framerate:');
    if (positionOfFramerate === -1) {
      throw new Error(ERROR_MESSAGES.NO_FRAMERATE_IN_MEDIAINFO);
    }

    const positionOfNewLinePostFramerate = mediainfoResult.indexOf('\n', positionOfFramerate);
    const framerateInString = mediainfoResult.substring(positionOfFramerate, positionOfNewLinePostFramerate);
    const framerateArray = framerateInString.match(REGEX.ONLY_NUMBER);
    if (!framerateArray || framerateArray.length === 0) {
      throw new Error(ERROR_MESSAGES.COULD_EXTRACT_FRAMERATE_PROPERLY);
    }

    const framerate = parseFloat(framerateArray[0]);
    return framerate;
  }

  static getOutputFilename(index: number, extension: FramoImageExtension): string {
    return `out_${index}_${Date.now()}.${extension}`;
  }

  static getFilmstripTileString(totalFramesInFilmstrip: number, orientation: FilmstripOrientation): string {
    if (orientation === FilmstripOrientation.HORIZONTAL) {
      return `tile=${totalFramesInFilmstrip}x1`;
    } else {
      return `tile=1x${totalFramesInFilmstrip}`;
    }
  }
}
