import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Logger } from 'nestjs-pino';

@Controller('farms')
export class FarmsController {
  constructor(
    private readonly farmsService: FarmsService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createFarmDto: CreateFarmDto) {
    try {
      const result = await this.farmsService.create(createFarmDto);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error creating farm', {
        error: error.message,
        stack: error.stack,
        context: createFarmDto,
      });

      throw new HttpException(
        `Failed to create farm. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.farmsService.findAll();
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving farms list', {
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve farms list. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.farmsService.findOne(id);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving farm', {
        id,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve farm. Details: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    try {
      const result = await this.farmsService.update(id, updateFarmDto);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error updating farm', {
        id,
        error: error.message,
        stack: error.stack,
        context: updateFarmDto,
      });

      throw new HttpException(
        `Failed to update farm. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.farmsService.remove(id);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.message;
    } catch (error) {
      this.logger.error('Error removing farm', {
        id,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to remove farm. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
