export interface Mediainfo {
  media: {
    track: Track[],
  }
}

export interface Track {
  FrameCount: string,
  Duration: string,
  FrameRate: string,
}
