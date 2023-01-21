export default class CreateCommentDto {
  public message!: string;
  public rating!: number;
  public postDate!: Date;
  public userId!: string;
  public filmId!: string;
}
