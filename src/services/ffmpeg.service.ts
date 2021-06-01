import { Subject } from "rxjs";
import { ERROR_MESSAGES } from "../constants/constants";
import { Progress } from "../models/generic.model";
import { Mediainfo } from "../models/mediainfo.model";
import { ScriptNames } from "../stores/scripts";
import { ScriptService } from "./script-loader.service";

const scripService = new ScriptService();

export declare const FFmpeg;
export declare const MediaInfo;

export class FfmpegService extends EventTarget {
  private static instance: FfmpegService;
  public ffmpeg;
  public mediainfo;
  isReady = false;
  progress = new Subject<Progress>();
  ready = new Subject<void>();

  public static getInstance(): FfmpegService {
    if (!FfmpegService.instance) {
      FfmpegService.instance = new FfmpegService();
    }

    return FfmpegService.instance;
  }

  initializeFramo = async (): Promise<void> => {
    await this.initializeFfmpeg();
    await this.initializeMediaInfo();
    this.isReady = true;
    this.emitReadyState();
  };

  initializeFfmpeg = async (): Promise<void> => {
    await scripService.loadScript(ScriptNames.FFMPEG);
    this.ffmpeg = FFmpeg.createFFmpeg({
      log: true,
    });
    await this.ffmpeg.load();
    this.initializeProgressForwarding();
  }

  initializeMediaInfo = async (): Promise<void> => {
    try {
      await scripService.loadScript(ScriptNames.MEDIAINFO);
      const opts = { chunkSize: 256 * 1024, coverData: false, format: 'object' };

      this.mediainfo = await new MediaInfo(opts);
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.MEDIAINFO_COULD_NOT_LOAD}: ${error}`);
    }
  }

  fetchFile = async (filename: string, file: File | Blob | ArrayBuffer | string): Promise<Blob> => {
    const fileAsUint8Array: Uint8Array = await FFmpeg.fetchFile(file);
    await this.ffmpeg.FS("writeFile", filename, fileAsUint8Array);
    return new Blob([fileAsUint8Array]);
  };

  initializeProgressForwarding(): void {
    this.ffmpeg.setProgress((progress: Progress) => {
      this.progress.next(progress);
    })
  }

  emitReadyState = (): void => {
    this.ready.next();
  }

  getMediaInfo = async (fileBlob: Blob): Promise<Mediainfo> => {
    const getSize = () => fileBlob.size

    const readChunk = (chunkSize: number, offset: number) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.error) {
            reject(event.target.error)
          }
          resolve(new Uint8Array(<ArrayBuffer>(event.target!.result)))
        }
        reader.readAsArrayBuffer(fileBlob.slice(offset, offset + chunkSize))
      })

    try {
      const result = await this.mediainfo
        .analyzeData(getSize, readChunk);
      return result;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.MEDIAINFO_COULD_NOT_ANALYZE_VIDEO)
    }
  }
}
