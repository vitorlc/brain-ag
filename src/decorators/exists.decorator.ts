import { registerDecorator, ValidationOptions } from 'class-validator';
import { ExistsConstraint } from 'src/validators/existsConstraint.validator';

export function Exists(
  EntityClass: any,
  key: string = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [EntityClass, key],
      validator: ExistsConstraint,
    });
  };
}
