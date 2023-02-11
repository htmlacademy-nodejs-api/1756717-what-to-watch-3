import UserDto from '../user/user.dto.js';

export default class FilmShortDto {
  public id!: string;

  public name!: string;

  public postDate!: string;

  public genre!: string;

  public previewVideoLink!: string;

  public commentsAmount!: number;

  public user!: UserDto;

  public posterImage!: string;

  public isFavorite!: boolean;
}
