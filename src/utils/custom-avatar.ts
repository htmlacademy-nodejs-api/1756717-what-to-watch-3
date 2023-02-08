import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'customAvatar', async: false })
export class CustomAvatar implements ValidatorConstraintInterface {
  validate(avatarUrl: string) {
    return avatarUrl.endsWith('.jpg') || avatarUrl.endsWith('.png');
  }
}
