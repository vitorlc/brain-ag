import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('farms-by-state')
  getFarmsByState() {
    return this.dashboardService.getFarmsByState();
  }

  @Get('crops-by-type')
  getCropsByType() {
    return this.dashboardService.getCropsByType();
  }

  @Get('land-use')
  getLandUse() {
    return this.dashboardService.getLandUse();
  }
}
