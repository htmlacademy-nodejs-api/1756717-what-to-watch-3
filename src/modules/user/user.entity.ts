import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';

const { prop } = typegoose;

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public userName!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop()
  public avatarUrl!: string;

  @prop({ required: true })
  public password!: string;
}

export const UserModel = getModelForClass(UserEntity);
