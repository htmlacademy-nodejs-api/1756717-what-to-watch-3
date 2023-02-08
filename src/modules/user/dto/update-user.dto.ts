import { IsOptional, Validate, Length } from 'class-validator';
import { userNameLength, userValidationMessages } from '../user.constant.js';
import { CustomAvatar } from '../../../utils/custom-avatar.js';

export default class UpdateUserDto {
  @IsOptional()
  @Length(userNameLength.MIN, userNameLength.MAX, {message: userValidationMessages.USERNAME})
  public userName?: string;

  @IsOptional()
  @Validate(CustomAvatar, {message: userValidationMessages.AVATAR})
  public avatarUrl?: string;
}
