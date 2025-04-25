import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { HarvestsService } from './harvests.service';
import { Logger } from 'nestjs-pino';

@Controller('harvests')
export class HarvestsController {
  constructor(
    private readonly harvestService: HarvestsService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createHarvestDto: CreateHarvestDto) {
    try {
      const result = await this.harvestService.create(createHarvestDto);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error creating the harvest', {
        context: createHarvestDto,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to create the harvest. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    try {
      const result = await this.harvestService.remove(name);
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode);
      }
      return result.message;
    } catch (error) {
      this.logger.error('Error removing the harvest', {
        name,
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to remove the harvest: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
