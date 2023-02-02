import { IsString, IsMongoId, Length, Max, Min, IsDateString } from 'class-validator';
import { FILMID_VALIDATION_MESSAGE, MAX_RATING_VALIDATION_MESSAGE, MESSAGE_REQUIRED_MESSAGE, MESSAGE_VALIDATION_MESSAGE, MIN_RATING_VALIDATION_MESSAGE, POSTDATE_COMMENT_VALIDATION_MESSAGE } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({message: MESSAGE_REQUIRED_MESSAGE})
  @Length(5, 1024, {message: MESSAGE_VALIDATION_MESSAGE})
  public message!: string;

  @Min(1, {message: MIN_RATING_VALIDATION_MESSAGE})
  @Max(10, {message: MAX_RATING_VALIDATION_MESSAGE})
  public rating!: number;

  @IsDateString({}, {message: POSTDATE_COMMENT_VALIDATION_MESSAGE})
  public postDate!: Date;

  public userId!: string;

  @IsMongoId({message: FILMID_VALIDATION_MESSAGE})
  public filmId!: string;
}
