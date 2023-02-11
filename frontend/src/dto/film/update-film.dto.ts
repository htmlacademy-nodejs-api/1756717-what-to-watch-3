import { GenreType } from '../../const.js';
import UserDto from '../user/user.dto.js';

export default class UpdateFilmDto {
  public id!: string;

  public name!: string;

  public description!: string;

  public genre!: GenreType;

  public released!: number;

  public rating!: number;

  public previewVideoLink!: string;

  public videoLink!: string;

  public starring!: string[];

  public director!: string;

  public runTime!: number;

  public user!: UserDto;

  public posterImage!: string;

  public backgroundImage!: string;

  public backgroundColor!: string;

  public isFavorite!: boolean;
}
