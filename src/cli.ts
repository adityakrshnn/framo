#!/usr/bin/env node

import { FrameExtractorService } from "./services/frame-extractor.service";

const frameExtractorService = FrameExtractorService.getInstance();

export const extractFrames = frameExtractorService.extractFrames;
