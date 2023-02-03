import { IsString, IsMongoId, Length, Max, Min, IsDateString } from 'class-validator';
import { commentRequiredMessages, commentValidationMessages, messageLength, rating } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({message: commentRequiredMessages.MESSAGE})
  @Length(messageLength.MIN, messageLength.MAX, {message: commentValidationMessages.MESSAGE})
  public message!: string;

  @Min(rating.MIN, {message: commentValidationMessages.MIN_RATING})
  @Max(rating.MAX, {message: commentValidationMessages.MAX_RATING})
  public rating!: number;

  @IsDateString({}, {message: commentValidationMessages.POSTDATE})
  public postDate!: Date;

  public userId!: string;

  @IsMongoId({message: commentValidationMessages.FILMID})
  public filmId!: string;
}
