import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Farmer } from './entities/farmer.entity';
import { Result } from 'src/utils/result';

@Injectable()
export class FarmersService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateFarmerDto) {
    const farmer = new Farmer(dto);
    await this.em.persistAndFlush(farmer);
    return Result.success(farmer);
  }

  async findAll() {
    const result = await this.em.find(Farmer, {})
    return Result.success(result);
  }

  async findOne(id: string) {
    const farmer = await this.em.findOne(Farmer, { id });
    if (!farmer) {
      return Result.error(`Farmer with id ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return Result.success(farmer);
  }

  async update(id: string, updateFarmerDto: UpdateFarmerDto) {
    const farmer = await this.em.findOne(Farmer, { id });
    if (!farmer) {
      return Result.error(`Farmer with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    farmer.update(updateFarmerDto);
    await this.em.persistAndFlush(farmer); 
    return Result.success(farmer);
  }

  async remove(id: string) {
    const farmer = await this.em.findOne(Farmer, { id });
    if (!farmer) {
      return Result.error(`Farmer with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.em.removeAndFlush(farmer);
    return Result.success({}, `Farmer with id ${id} removed successfully`);
  }
}
