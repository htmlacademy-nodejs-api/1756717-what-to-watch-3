import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class ShortFilmResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public genre!: string;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public commentsAmount!: number;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public posterImage!: string;

  @Expose()
  public isFavorite!: boolean;
}
