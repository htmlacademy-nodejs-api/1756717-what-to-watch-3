import { Length, IsDateString, IsEnum, IsArray, IsMongoId, Contains } from 'class-validator';
import { GenreType } from '../../../types/genre-type.enum.js';
import { BACKGROUNDIMAGE_VALIDATION_MESSAGE, DESCRIPTION_VALIDATION_MESSAGE, DIRECTOR_VALIDATION_MESSAGE, GENRE_VALIDATION_MESSAGE, NAME_VALIDATION_MESSAGE, POSTDATE_VALIDATION_MESSAGE, POSTER_VALIDATION_MESSAGE, STARRING_VALIDATION_MESSAGE, USER_VALIDATION_MESSAGE } from '../film.constant.js';

export default class CreateFilmDto {
  @Length(2, 100, {message: NAME_VALIDATION_MESSAGE})
  public name!: string;

  @Length(20, 1024, {message: DESCRIPTION_VALIDATION_MESSAGE})
  public description!: string;

  @IsDateString({}, {message: POSTDATE_VALIDATION_MESSAGE})
  public postDate!: Date;

  @IsEnum(GenreType, {message: GENRE_VALIDATION_MESSAGE})
  public genre!: GenreType;

  public released!: number;
  public rating!: number;
  public previewVideoLink!: string;
  public videoLink!: string;

  @IsArray({message: STARRING_VALIDATION_MESSAGE})
  public starring!: string[];

  @Length(2, 50, {message: DIRECTOR_VALIDATION_MESSAGE})
  public director!: string;

  public runTime!: number;

  @IsMongoId({message: USER_VALIDATION_MESSAGE})
  public userId!: string;

  @Contains('.jpg', {message: POSTER_VALIDATION_MESSAGE})
  public posterImage!: string;

  @Contains('.jpg', {message: BACKGROUNDIMAGE_VALIDATION_MESSAGE})
  public backgroundImage!: string;

  public backgroundColor!: string;
}
