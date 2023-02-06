import { Length, IsDateString, IsEnum, IsArray, IsMongoId, Contains, IsOptional } from 'class-validator';
import { GenreType } from '../../../types/genre-type.enum.js';
import { filmValidationMessages, nameLength, descriptionLength, directorLength } from '../film.constant.js';

export default class UpdateFilmDto {
  @IsOptional()
  @Length(nameLength.MIN, nameLength.MAX, {message: filmValidationMessages.NAME})
  public name?: string;

  @IsOptional()
  @Length(descriptionLength.MIN, descriptionLength.MAX, {message: filmValidationMessages.DESCRIPTION})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: filmValidationMessages.POSTDATE})
  public postDate?: Date;

  @IsOptional()
  @IsEnum(GenreType, {message: filmValidationMessages.GENRE})
  public genre?: GenreType;

  @IsOptional()
  public released?: number;

  public rating?: number;

  @IsOptional()
  public previewVideoLink?: string;

  @IsOptional()
  public videoLink?: string;

  @IsOptional()
  @IsArray({message: filmValidationMessages.STARRING})
  public starring?: string[];

  @IsOptional()
  @Length(directorLength.MIN, directorLength.MAX, {message: filmValidationMessages.DIRECTOR})
  public director?: string;

  @IsOptional()
  public runTime?: number;

  @IsOptional()
  @IsMongoId({message: filmValidationMessages.USER})
  public userId?: string;

  @IsOptional()
  @Contains('.jpg', {message: filmValidationMessages.POSTER})
  public posterImage?: string;

  @IsOptional()
  @Contains('.jpg', {message: filmValidationMessages.BACKGROUND_IMAGE})
  public backgroundImage?: string;

  @IsOptional()
  public backgroundColor?: string;
}
