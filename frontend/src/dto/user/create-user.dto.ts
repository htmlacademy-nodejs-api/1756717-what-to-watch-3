export default class CreateUserDto {
  public userName!: string;

  public email!: string;

  public avatarUrl!: File | undefined;

  public password!: string;
}
