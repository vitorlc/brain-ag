import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Logger } from 'nestjs-pino';

@Controller('farmers')
export class FarmersController {
  constructor(
    private readonly farmersService: FarmersService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createFarmerDto: CreateFarmerDto) {
    try {
      const result = await this.farmersService.create(createFarmerDto);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error creating farmer', {
        error: error.message,
        stack: error.stack,
        context: createFarmerDto,
      });

      throw new HttpException(
        `Failed to create farmer. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.farmersService.findAll();
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving farmers list', {
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve farmers list. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.farmersService.findOne(id);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving farmer', {
        id,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve farmer. Details: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    try {
      const result = await this.farmersService.update(id, updateFarmerDto);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error updating farmer', {
        id,
        error: error.message,
        stack: error.stack,
        context: updateFarmerDto,
      });

      throw new HttpException(
        `Failed to update farmer. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.farmersService.remove(id);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.message;
    } catch (error) {
      this.logger.error('Error removing farmer', {
        id,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to remove farmer. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
