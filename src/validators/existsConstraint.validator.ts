import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { EntityManager } from '@mikro-orm/postgresql';

@ValidatorConstraint({ async: true })
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly em: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, key = 'id'] = args.constraints;

    if (!value) return false;

    const found = await this.em.count(EntityClass, { [key]: value });
    return found > 0;
  }

  defaultMessage(args: ValidationArguments) {
    const [, key = 'id'] = args.constraints;
    return `${args.property} does not refer to an existing ${key}`;
  }
}
