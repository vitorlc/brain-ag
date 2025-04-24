import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { Exists } from 'src/decorators/exists.decorator';
import { Farmer } from 'src/farmers/entities/farmer.entity';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @Min(0)
  totalArea: number;

  @IsNumber()
  @Min(0)
  agriculturalArea: number;

  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @IsString()
  @Exists(Farmer, { message: 'farmer not found' })
  farmerId: string
}
