// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';

import os from 'os';
import path from 'path';
import axios from 'axios';
import { promises as fs } from 'fs';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
  Logger,
} from '@nestjs/common';

@Controller('image-cache')
export class ImageCacheController {
  private readonly logger = new Logger(ImageCacheController.name);

  @Get()
  public async getFromCache(
    @Query('i') imageUrl: string,
    @Res() res: Response
  ) {
    if (!imageUrl) {
      throw new HttpException(
        'INVALID_IMAGE_URL',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    // Create a safe filename from the URL for caching
    const safeFilename = encodeURIComponent(imageUrl.replace(/\//g, '_'));
    const filePath = path.join(os.tmpdir(), '/bobarr-image-cache', safeFilename);

    try {
      // Check if we have the image cached
      await fs.stat(filePath);
      const fileBuffer = await fs.readFile(filePath);
      res.contentType('image/jpeg');
      return res.send(fileBuffer);
    } catch (error) {
      try {
        // If not in cache, fetch from TMDB
        this.logger.debug(`Fetching image from TMDB: ${imageUrl}`);

        const { data: buffer } = await axios.get(
          `https://image.tmdb.org/t/p/${imageUrl}`,
          {
            responseType: 'arraybuffer',
          }
        );

        // Create cache directory and save the image
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, buffer);

        // Send the image
        res.contentType('image/jpeg');
        return res.send(buffer);
      } catch (fetchError: unknown) {
        const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';
        this.logger.error(`Failed to fetch image: ${imageUrl}`, errorMessage);

        // Return a placeholder image or 404
        return res.status(HttpStatus.NOT_FOUND).send('Image not found');
      }
    }
  }
}
