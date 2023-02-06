import { IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  public userName?: string;

  @IsOptional()
  public avatarUrl?: string;
}
