import { User } from '../../types/user.type.js';

export class UserEntity implements User {
  public userName!: string;
  public email!: string;
  public avatarUrl!: string;
}
