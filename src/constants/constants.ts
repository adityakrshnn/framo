export const ERROR_MESSAGES = {
  FRAMO_NOT_INITIALIZED: 'Framo has not been initialized. Please call initializeFramo before using any of the features',
  MEDIAINFO_COULD_NOT_LOAD: 'Unable to fetch total frames: MediaInfo could not load',
  MEDIAINFO_COULD_NOT_ANALYZE_VIDEO: 'Unable to analyze video',
  NO_FRAMERATE_IN_MEDIAINFO: 'No framerate in mediainfo',
  COULD_EXTRACT_FRAMERATE_PROPERLY: 'Could not extract framerate number properly',
}

export const REGEX = {
  ONLY_NUMBER: /[\d.+]+/g,
}
