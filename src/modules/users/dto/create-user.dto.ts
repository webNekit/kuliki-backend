import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AppRole } from 'src/common/types/index.type';

export class CreateUserDto {
  @IsEmail({}, { message: 'Введите корректный email' })
  email: string;

  @IsString({ message: 'Поле [пароль] должно быть строкой' })
  @MinLength(6, { message: 'Минимальное кол-во символов: 6' })
  @MaxLength(12, { message: 'Максимальное кол-во символов: 12' })
  password: string;

  @IsEnum(AppRole, {
    message: `Роль должна быть одной из следующих ${Object.values(AppRole).join(', ')}`,
  })
  role: AppRole;

  @IsString()
  fullName: string;
}
