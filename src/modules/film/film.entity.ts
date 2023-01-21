import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { GenreType } from '../../types/genre-type.enum.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})

export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: GenreType,
    required: true
  })
  public genre!: GenreType;

  @prop({ required: true })
  public released!: number;

  @prop({ required: true, default: 0 })
  public rating!: number;

  @prop({ required: true })
  public previewVideoLink!: string;

  @prop({ required: true })
  public videoLink!: string;

  @prop({ required: true })
  public starring!: string[];

  @prop({ required: true })
  public director!: string;

  @prop({ required: true })
  public runTime!: number;

  @prop({ default: 0 })
  public commentsAmount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ required: true })
  public posterImage!: string;

  @prop({ required: true })
  public backgroundImage!: string;

  @prop({ required: true })
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);
