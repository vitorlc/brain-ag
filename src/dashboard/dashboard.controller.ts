import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Logger } from 'nestjs-pino';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly logger: Logger,
  ) {}

  @Get('summary')
  async getSummary() {
    try {
      const result = await this.dashboardService.getSummary();
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving dashboard summary', {
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve dashboard summary. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('farms-by-state')
  async getFarmsByState() {
    try {
      const result = await this.dashboardService.getFarmsByState();
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving farms by state', {
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve farms by state. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('crops-by-type')
  async getCropsByType() {
    try {
      const result = await this.dashboardService.getCropsByType();
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving crops by type', {
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve crops by type. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('land-use')
  async getLandUse() {
    try {
      const result = await this.dashboardService.getLandUse();
      if (!result.success) {
        throw new HttpException(result.message, result.statusCode)
      }
      return result.data;
    } catch (error) {
      this.logger.error('Error retrieving land use data', {
        error: error.message,
        stack: error.stack,
      });

      throw new HttpException(
        `Failed to retrieve land use data. Details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
