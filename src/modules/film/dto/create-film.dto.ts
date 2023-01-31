import { Length, IsDateString, IsEnum, IsArray, IsMongoId, Contains, IsString, IsInt } from 'class-validator';
import { GenreType } from '../../../types/genre-type.enum.js';
import { BACKGROUNDCOLOR_REQUIRED_MESSAGE, BACKGROUNDIMAGE_REQUIRED_MESSAGE, BACKGROUNDIMAGE_VALIDATION_MESSAGE, DESCRIPTION_REQUIRED_MESSAGE, DESCRIPTION_VALIDATION_MESSAGE, DIRECTOR_REQUIRED_MESSAGE, DIRECTOR_VALIDATION_MESSAGE, GENRE_REQUIRED_MESSAGE, GENRE_VALIDATION_MESSAGE, NAME_REQUIRED_MESSAGE, NAME_VALIDATION_MESSAGE, POSTDATE_REQUIRED_MESSAGE, POSTDATE_VALIDATION_MESSAGE, POSTER_REQUIRED_MESSAGE, POSTER_VALIDATION_MESSAGE, PREVIEWVIDEO_REQUIRED_MESSAGE, RELEASED_REQUIRED_MESSAGE, RUNTIME_REQUIRED_MESSAGE, STARRING_VALIDATION_MESSAGE, USER_REQUIRED_MESSAGE, USER_VALIDATION_MESSAGE, VIDEO_REQUIRED_MESSAGE } from '../film.constant.js';

export default class CreateFilmDto {
  @IsString({message: NAME_REQUIRED_MESSAGE})
  @Length(2, 100, {message: NAME_VALIDATION_MESSAGE})
  public name!: string;

  @IsString({message: DESCRIPTION_REQUIRED_MESSAGE})
  @Length(20, 1024, {message: DESCRIPTION_VALIDATION_MESSAGE})
  public description!: string;

  @IsString({message: POSTDATE_REQUIRED_MESSAGE})
  @IsDateString({}, {message: POSTDATE_VALIDATION_MESSAGE})
  public postDate!: Date;

  @IsString({message: GENRE_REQUIRED_MESSAGE})
  @IsEnum(GenreType, {message: GENRE_VALIDATION_MESSAGE})
  public genre!: GenreType;

  @IsInt({message: RELEASED_REQUIRED_MESSAGE})
  public released!: number;

  public rating!: number;

  @IsString({message: PREVIEWVIDEO_REQUIRED_MESSAGE})
  public previewVideoLink!: string;

  @IsString({message: VIDEO_REQUIRED_MESSAGE})
  public videoLink!: string;

  @IsArray({message: STARRING_VALIDATION_MESSAGE})
  public starring!: string[];

  @IsString({message: DIRECTOR_REQUIRED_MESSAGE})
  @Length(2, 50, {message: DIRECTOR_VALIDATION_MESSAGE})
  public director!: string;

  @IsInt({message: RUNTIME_REQUIRED_MESSAGE})
  public runTime!: number;

  @IsString({message: USER_REQUIRED_MESSAGE})
  @IsMongoId({message: USER_VALIDATION_MESSAGE})
  public userId!: string;

  @IsString({message: POSTER_REQUIRED_MESSAGE})
  @Contains('.jpg', {message: POSTER_VALIDATION_MESSAGE})
  public posterImage!: string;

  @IsString({message: BACKGROUNDIMAGE_REQUIRED_MESSAGE})
  @Contains('.jpg', {message: BACKGROUNDIMAGE_VALIDATION_MESSAGE})
  public backgroundImage!: string;

  @IsString({message: BACKGROUNDCOLOR_REQUIRED_MESSAGE})
  public backgroundColor!: string;
}
