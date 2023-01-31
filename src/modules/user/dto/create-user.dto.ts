import { IsString, Length , IsEmail, Validate } from 'class-validator';
import { AVATAR_VALIDATION_MESSAGE, EMAIL_REQUIRED_MESSAGE, EMAIL_VALIDATION_MESSAGE, PASSWORD_REQUIRED_MESSAGE, PASSWORD_VALIDATION_MESSAGE, USERNAME_REQUIRED_MESSAGE, USERNAME_VALIDATION_MESSAGE } from '../user.constant.js';
import { CustomAvatar } from '../../../utils/custom-avatar-validation.js';

export default class CreateUserDto {
  @IsString({message: USERNAME_REQUIRED_MESSAGE})
  @Length(1, 15, {message: USERNAME_VALIDATION_MESSAGE})
  public userName!: string;

  @IsString({message: EMAIL_REQUIRED_MESSAGE})
  @IsEmail({}, {message: EMAIL_VALIDATION_MESSAGE})
  public email!: string;

  @Validate(CustomAvatar, {message: AVATAR_VALIDATION_MESSAGE})
  public avatarUrl!: string;

  @IsString({message: PASSWORD_REQUIRED_MESSAGE})
  @Length(6, 12, {message: PASSWORD_VALIDATION_MESSAGE})
  public password!: string;
}
