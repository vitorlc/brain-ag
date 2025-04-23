import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsCpfOrCnpj } from 'src/validators/cpfCnpj.validator';

export class CreateFarmerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Validate(IsCpfOrCnpj)
    cpfCnpj: string;
}
