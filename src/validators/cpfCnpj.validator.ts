import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { isValidCNPJ, isValidCPF } from 'src/utils/validate-documents';

@ValidatorConstraint({ name: 'isCpfOrCnpj', async: false })
export class IsCpfOrCnpj implements ValidatorConstraintInterface {
    validate(value: string) {
        if (value === undefined || value === null || value === '') return true;
        const clean = String(value)?.replace(/\D/g, '');
        return isValidCPF(clean) || isValidCNPJ(clean);
    }

    defaultMessage(args: ValidationArguments) {
        return 'invalid CPF or CNPJ';
    }
}