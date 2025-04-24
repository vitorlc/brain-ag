import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Harvest } from 'src/cultivation/harvests/entities/harvest.entity';
import { Exists } from 'src/decorators/exists.decorator';
import { Farm } from 'src/farms/entities/farm.entity';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Exists(Farm, 'id', { message: 'farm not found' })
  farmId: string;

  @IsString()
  @Exists(Harvest, 'name', { message: 'harvest not found' })
  harvest: string;
}
