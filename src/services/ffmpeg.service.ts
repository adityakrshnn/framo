import { ScriptNames } from "../stores/scripts";
import { ScriptService } from "./script-loader.service";

const scripService = new ScriptService();

declare const FFmpeg;

export class FfmpegService extends EventTarget {
  private static instance: FfmpegService;
  public ffmpeg;
  progress = new EventTarget();

  public static getInstance(): FfmpegService {
    if (!FfmpegService.instance) {
      FfmpegService.instance = new FfmpegService();
    }

    return FfmpegService.instance;
  }

  initializeFfmpeg = async () => {
    await scripService.loadScript(ScriptNames.FFMPEG);
    this.ffmpeg = FFmpeg.createFFmpeg({
      log: true,
    });
    await this.ffmpeg.load();
    this.initializeProgressForwarding();
  };

  fetchFile = async (filename: string, file: File | Blob | ArrayBuffer | string) => {
    this.ffmpeg.FS("writeFile", filename, await FFmpeg.fetchFile(file));
  };

  initializeProgressForwarding() {
    this.ffmpeg.setProgress((event) => {
      this.progress.dispatchEvent(new CustomEvent('progress', { detail: event}));
    })
  }
}
