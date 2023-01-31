import { IsEmail, IsString } from 'class-validator';
import { EMAIL_VALIDATION_MESSAGE, PASSWORD_REQUIRED_MESSAGE } from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, {message: EMAIL_VALIDATION_MESSAGE})
  public email!: string;

  @IsString({message: PASSWORD_REQUIRED_MESSAGE})
  public password!: string;
}
