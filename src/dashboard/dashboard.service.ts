import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Farm } from 'src/farms/entities/farm.entity';
import { Result } from 'src/utils/result';

interface StateCount {
  state: string;
  count: string;
}

interface CropCount {
  name: string;
  count: string;
}

interface LandUse {
  agricultural: string;
  vegetation: string;
}

@Injectable()
export class DashboardService {
    constructor(private readonly em: EntityManager) {}

    async getSummary() {
        const totalFarms = await this.em.count(Farm);
        const [{ total }] = await this.em.execute<{ total: string }[]>(
          'SELECT SUM(total_area) as total FROM farm'
        );
    
        return Result.success({
          totalFarms,
          totalHectares: Number(total || 0),
        })
    }

    async getFarmsByState() {
        const result = await this.em.execute<StateCount[]>(
          'SELECT state, COUNT(id) as count FROM farm GROUP BY state'
        );
    
        return Result.success(result.map(r => ({ state: r.state, count: Number(r.count) })));
    }

    async getCropsByType() {
        const result = await this.em.execute<CropCount[]>(
          'SELECT name, COUNT(id) as count FROM crop GROUP BY name'
        );
    
        return Result.success(result.map(r => ({ crop: r.name, count: Number(r.count) })));
    }

    async getLandUse() {
        const [result] = await this.em.execute<LandUse[]>(
          'SELECT SUM(agricultural_area) as agricultural, SUM(vegetation_area) as vegetation FROM farm'
        );
    
        return Result.success({
          agriculturalArea: Number(result?.agricultural || 0),
          vegetationArea: Number(result?.vegetation || 0),
        });
    }
}
