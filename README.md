<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/adityakrshnn/framo">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center">Framo</h1>

  <!-- PROJECT SHIELDS -->
  <p align="center">
    <img alt="Framo License" src="https://img.shields.io/npm/l/framo" />
    <img alt="CodeQL" src="https://github.com/adityakrshnn/framo/actions/workflows/codeql-analysis.yml/badge.svg" />
    <img alt="Lint & Test" src="https://github.com/adityakrshnn/framo/actions/workflows/lint-and-test.yml/badge.svg" />
    <img alt="Framo bundle size" src="https://img.shields.io/bundlephobia/min/framo"/>
    <a href="https://www.npmjs.com/package/framo"><img alt="Framo npm version" src="https://img.shields.io/npm/v/framo"/></a>
    <img alt="Framo Maintained yes" src="https://img.shields.io/badge/Maintained-Yes-brightgreen"/>
  </p>

  <p align="center">
    Awesome out-of-the-box media features with zero-config client-side processing and Typescript support
    <br />
    <a href="https://adityakrshnn.github.io/framo/classes/framo.html"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/adityakrshnn/framo">View Demo</a>
    ·
    <a href="https://github.com/adityakrshnn/framo/issues">Report Bug</a>
    ·
    <a href="https://github.com/adityakrshnn/framo/issues">Request Feature</a> -->
  </p>
</p>

<!-- TABLE OF CONTENTS -->
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <!-- <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul> -->
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#observables">Observables</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#license">License</a></li>
    <!-- <li><a href="#contact">Contact</a></li> -->
    <!-- <li><a href="#acknowledgements">Acknowledgements</a></li> -->
  </ol>

<!-- ABOUT THE PROJECT -->

## About The Project

Framo aims to provide advanced media features on the browser itself without having to configure or setup multiple dependencies. It does all the hard work for you by using the best configurations for FFmpeg and only exposing the necessary options. See the [_full list of features_](https://github.com/adityakrshnn/framo#features).
<br/>

Framo is made using:

- [FFmpeg WASM](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [Typescript](https://www.typescriptlang.org)

<!-- GETTING STARTED -->

## Getting Started

### Installation

To use Framo in your project

```sh
npm install framo
```

### Usage

Initialize framo with [initializeFramo()](https://adityakrshnn.github.io/framo/classes/framo.html#initializeframo) before using any of its features

```ts
const framo = new Framo();

await framo.initializeFramo();
...
OR
framo.initializeFramo().then(() => {
  ...
})
```

Alternatively, you can initialize framo asynchronously by subscribing to [`ready`](https://adityakrshnn.github.io/framo/classes/framo.html#ready) observable.

```
const framo = new Framo();

framo.ready.subscribe(() => {
  ...
});
framo.initializeFramo();
```

<!-- USAGE EXAMPLES -->

## Features

### 🎞️ Filmstrip : [`makeFilmstrip()`](https://adityakrshnn.github.io/framo/classes/framo.html#makeFilmstrip)

Make a filmstrip using frames at regular intervals.

```ts
const config: FilmstripRequestConfig = {
  file: <File>,
  filename: 'input.mp4',
  timeInterval: 1,
  outputExtension: FramoImageExtension.JPG,
  orientation: FilmstripOrientation.VERTICAL,
  resolution: {
    height: 150,
  },
}
```

### 🖼 Frame Extractor : [`extractFrames()`](https://adityakrshnn.github.io/framo/classes/framo.html#extractframes)

Extract frames from videos at specific time points or at regular intervals.

```ts
const config: FilmstripRequestConfig = {
  file: <File>,
  filename: 'input.mp4',
  timeInterval: 5,
  outputExtension: FramoImageExtension.JPG,
};

```

_More features coming soon..._
<br/>

## Observables

### ⚡ Ready

[`ready`](https://adityakrshnn.github.io/framo/classes/framo.html#ready) is triggered when framo is ready for operations.

```ts
framo.ready.subscribe(() => {
  ...
});
```

### ⚡ Progress

Subscribe to the [`progress`](https://adityakrshnn.github.io/framo/classes/framo.html#progress) observable to monitor operation progress.

```ts
framo.progress.subscribe((progress: Progress) => {
  ...
});
```

## Documentation

_For more details, please refer to the [Documentation](https://adityakrshnn.github.io/framo/classes/framo.html)_

<!-- ROADMAP -->
<!-- ## Roadmap

See the [open issues](https://github.com/adityakrshnn/framo/issues) for a list of proposed features (and known issues). -->

<!-- CONTRIBUTING -->
<!-- ## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT
## Contact

Your Name - [@adityakrshnn](https://twitter.com/adityakrshnn) - adityakrshnn@gmail.com

Project Link: [https://github.com/adityakrshnn/framo](https://github.com/adityakrshnn/framo) -->

<!-- ACKNOWLEDGEMENTS
## Acknowledgements

* []()
* []()
* []() -->
