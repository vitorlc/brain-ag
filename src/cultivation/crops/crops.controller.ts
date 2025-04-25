import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CropsService } from './crops.service';
import { Logger } from 'nestjs-pino';
import { CreateCropDto } from './dto/create-crop.dto';

@Controller('crops')
export class CropsController {
  constructor(
    private readonly cropsService: CropsService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createCropDto: CreateCropDto) {
    try {
      const result = await this.cropsService.create(createCropDto);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error on create crops', {
        context: createCropDto,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to create the crop. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.cropsService.remove(id);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.message;
    } catch (error) {
      this.logger.error('Error removing the crop', {
        id,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to remove the crop: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
