import { IsEmail, IsString } from 'class-validator';
import { userRequiredMessages, userValidationMessages } from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, {message: userValidationMessages.EMAIL})
  public email!: string;

  @IsString({message: userRequiredMessages.PASSWORD})
  public password!: string;
}
