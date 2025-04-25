import { IsOptional, IsString, Validate } from 'class-validator';
import { IsCpfOrCnpj } from 'src/validators/cpfCnpj.validator';

export class UpdateFarmerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Validate(IsCpfOrCnpj)
  cpfCnpj?: string;
}
