import { IsString, Length , IsEmail } from 'class-validator';
import { userRequiredMessages, userValidationMessages, userNameLength, passwordLength } from '../user.constant.js';

export default class CreateUserDto {
  @IsString({message: userRequiredMessages.USERNAME})
  @Length(userNameLength.MIN, userNameLength.MAX, {message: userValidationMessages.USERNAME})
  public userName!: string;

  @IsString({message: userRequiredMessages.EMAIL})
  @IsEmail({}, {message: userValidationMessages.EMAIL})
  public email!: string;

  @IsString({message: userRequiredMessages.PASSWORD})
  @Length(passwordLength.MIN, passwordLength.MAX, {message: userValidationMessages.PASSWORD})
  public password!: string;
}
