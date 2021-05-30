import { Scripts, ScriptStore } from "../stores/scripts";

export enum LoadStatus {
  AlreadyLoaded = "Already Loaded",
  Loaded = "Loaded",
}

export interface ScriptLoadedMapping {
  loaded: boolean;
  src: string;
}

export interface ScriptLoadedResponse {
  script: string;
  loaded: boolean;
  status: LoadStatus;
}

declare const document: Document;

export class ScriptService {
  private scripts: { [id: string]: ScriptLoadedMapping } = {};

  constructor() {
    ScriptStore.forEach((script: Scripts) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
      };
    });
  }

  load(...scripts: string[]): Promise<ScriptLoadedResponse[]> {
    const promises: Promise<ScriptLoadedResponse>[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string): Promise<ScriptLoadedResponse> {
    return new Promise((resolve) => {
      if (this.scripts[name].loaded) {
        const response: ScriptLoadedResponse = {
          script: name,
          loaded: true,
          status: LoadStatus.AlreadyLoaded,
        };
        resolve(response);
      } else {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = this.scripts[name].src;

        script.onload = () => {
          this.scripts[name].loaded = true;
          const response: ScriptLoadedResponse = {
            script: name,
            loaded: true,
            status: LoadStatus.Loaded,
          };
          resolve(response);
        };

        script.onerror = (error: Error) => {
          console.error(error);
          const response: ScriptLoadedResponse = {
            script: name,
            loaded: false,
            status: LoadStatus.Loaded,
          };
          resolve(response);
        };
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    });
  }
}
