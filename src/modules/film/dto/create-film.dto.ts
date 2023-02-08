import { Length, IsDateString, IsEnum, IsArray, Contains, IsString, IsInt } from 'class-validator';
import { GenreType } from '../../../types/genre-type.enum.js';
import { filmRequiredMessages, filmValidationMessages, nameLength, descriptionLength, directorLength } from '../film.constant.js';

export default class CreateFilmDto {
  @IsString({message: filmRequiredMessages.NAME})
  @Length(nameLength.MIN, nameLength.MAX, {message: filmValidationMessages.NAME})
  public name!: string;

  @IsString({message: filmRequiredMessages.DESCRIPTION})
  @Length(descriptionLength.MIN, descriptionLength.MAX, {message: filmValidationMessages.DESCRIPTION})
  public description!: string;

  @IsString({message: filmRequiredMessages.POSTDATE})
  @IsDateString({}, {message: filmValidationMessages.POSTDATE})
  public postDate!: Date;

  @IsString({message: filmRequiredMessages.GENRE})
  @IsEnum(GenreType, {message: filmValidationMessages.GENRE})
  public genre!: GenreType;

  @IsInt({message: filmRequiredMessages.RELEASED})
  public released!: number;

  public rating!: number;

  @IsString({message: filmRequiredMessages.PREVIEW_VIDEO})
  public previewVideoLink!: string;

  @IsString({message: filmRequiredMessages.VIDEO})
  public videoLink!: string;

  @IsArray({message: filmValidationMessages.STARRING})
  public starring!: string[];

  @IsString({message: filmRequiredMessages.DIRECTOR})
  @Length(directorLength.MIN, directorLength.MAX, {message: filmValidationMessages.DIRECTOR})
  public director!: string;

  @IsInt({message: filmRequiredMessages.RUNTIME})
  public runTime!: number;

  public userId!: string;

  @IsString({message: filmRequiredMessages.BACKGROUND_IMAGE})
  @Contains('.jpg', {message: filmValidationMessages.BACKGROUND_IMAGE})
  public backgroundImage!: string;

  @IsString({message: filmRequiredMessages.BACKGROUND_COLOR})
  public backgroundColor!: string;
}
