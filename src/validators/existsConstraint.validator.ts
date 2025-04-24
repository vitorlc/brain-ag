import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { EntityManager } from '@mikro-orm/postgresql';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly em: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass] = args.constraints;

    if (!value) return false;

    const found = await this.em.count(EntityClass, { id: value });
    return found > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not refer to an existing entity`;
  }
}
