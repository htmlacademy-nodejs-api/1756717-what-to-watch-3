import UserDto from '../user/user.dto.js';
import { GenreType } from '../../const.js';

export default class FilmDto {
  public id!: string;

  public name!: string;

  public description!: string;

  public postDate!: Date;

  public genre!: GenreType;

  public released!: number;

  public rating!: number;

  public previewVideoLink!: string;

  public videoLink!: string;

  public starring!: string[];

  public director!: string;

  public runTime!: number;

  public commentsAmount!: number;

  public user!: UserDto;

  public posterImage!: string;

  public backgroundImage!: string;

  public backgroundColor!: string;

  public isPromo?: boolean;

  public isFavorite!: boolean;
}
