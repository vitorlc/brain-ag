import { EntityManager } from '@mikro-orm/postgresql';
import { HttpStatus } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { Farmer } from 'src/farmers/entities/farmer.entity';

const mockEm = {
  persistAndFlush: jest.fn(),
  findOne: jest.fn(),
  getReference: jest.fn(),
  flush: jest.fn(),
  find: jest.fn(),
  removeAndFlush: jest.fn(),
  createQueryBuilder: jest.fn(),
  qb: jest.fn(),
  getKnex: jest.fn(),
  execute: jest.fn(),
};

jest.mock('@mikro-orm/postgresql', () => ({
  EntityManager: jest.fn().mockImplementation(() => mockEm),
}));

describe('FarmService', () => {
  let farmService: FarmsService;
  let em: EntityManager;

  beforeEach(() => {
    em = mockEm as any;
    farmService = new FarmsService(em);
  });

  describe('create', () => {
    it('should return error if the sum of agriculturalArea and vegetationArea exceeds totalArea', async () => {
      const dto: CreateFarmDto = {
        name: 'Test Farm',
        city: 'Test City',
        state: 'Test State',
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 50,
        farmerId: '1',
      };

      const result = await farmService.create(dto);

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        'The sum of agriculturalArea and vegetationArea must not exceed totalArea',
      );
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should create a farm successfully when the areas are valid', async () => {
      const dto: CreateFarmDto = {
        name: 'Test Farm',
        city: 'Test City',
        state: 'Test State',
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 30,
        farmerId: '1',
      };

      const mockFarmer = new Farmer({
        name: 'Test Farmer',
        cpfCnpj: '12345678900',
      });

      mockEm.getReference.mockReturnValue(mockFarmer);

      const result = await farmService.create(dto);

      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Farm);
    });
  });

  describe('update', () => {
    it('should return error if the farm is not found', async () => {
      const id = 'non-existent-id';
      const dto = { totalArea: 100, agriculturalArea: 60, vegetationArea: 40 };

      mockEm.findOne.mockResolvedValue(null);

      const result = await farmService.update(id, dto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Farm not found');
      expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return error if the sum of agriculturalArea and vegetationArea exceeds totalArea during update', async () => {
      const id = '1';
      const dto = {
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 50,
      };

      const mockFarm = new Farm({
        name: 'Test Farm',
        city: 'Test City',
        state: 'Test State',
        totalArea: 100,
        agriculturalArea: 50,
        vegetationArea: 40,
        farmer: new Farmer({ name: 'Test Farmer', cpfCnpj: '12345678900' }),
      });

      mockEm.findOne.mockResolvedValue(mockFarm);

      const result = await farmService.update(id, dto);

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        'The sum of agriculturalArea and vegetationArea must not exceed totalArea',
      );
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should update the farm successfully when the areas are valid', async () => {
      const id = '1';
      const dto = {
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 30,
      };

      const mockFarm = new Farm({
        name: 'Test Farm',
        city: 'Test City',
        state: 'Test State',
        totalArea: 100,
        agriculturalArea: 50,
        vegetationArea: 40,
        farmer: new Farmer({ name: 'Test Farmer', cpfCnpj: '12345678900' }),
      });

      mockEm.findOne.mockResolvedValue(mockFarm);
      mockFarm.update = jest.fn();

      const result = await farmService.update(id, dto);

      expect(result.success).toBe(true);
      expect(result.data).toBe(mockFarm);
      expect(mockFarm.update).toHaveBeenCalledWith(dto);
      expect(mockEm.flush).toHaveBeenCalled();
    });
  });
});
