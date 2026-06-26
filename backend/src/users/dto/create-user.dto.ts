export class CreateUserDto {
  email!: string;
  username?: string;
  fullName?: string;
  googleId?: string;
  picture?: string;
  password?: string;
}