import { GenreType } from '../../const.js';

export default class CreateFilmDto {
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

  public backgroundImage!: string;

  public backgroundColor!: string;
}
