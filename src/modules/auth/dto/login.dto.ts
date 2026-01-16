import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Задан некорректный email-адрес' })
  email: string;

  @IsString({ message: 'Поле [пароль] должно быть строкой' })
  @MinLength(6, { message: 'Минимальное кол-во символов: 6' })
  @MaxLength(12, { message: 'Максимальное кол-во символов: 12' })
  password: string;
}
