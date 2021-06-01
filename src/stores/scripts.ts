export interface Scripts {
  name: string;
  src: string;
}

export enum ScriptNames {
  FFMPEG = 'ffmpeg',
  MEDIAINFO = "mediainfo",
}

export const ScriptStore: Scripts[] = [
  {
    name: ScriptNames.FFMPEG,
    src: "https://unpkg.com/@ffmpeg/ffmpeg@0.10.0/dist/ffmpeg.min.js",
  },
  {
    name: ScriptNames.MEDIAINFO,
    src: "https://unpkg.com/mediainfo.js/dist/mediainfo.min.js",
  },
];
