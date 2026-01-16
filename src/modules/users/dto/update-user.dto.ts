import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AppRole } from 'src/common/types/index.type';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Введите корректный email' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Поле [пароль] должно быть строкой' })
  @MinLength(6, { message: 'Минимальное кол-во символов: 6' })
  @MaxLength(12, { message: 'Максимальное кол-во символов: 12' })
  password?: string;

  @IsOptional()
  @IsEnum(AppRole, {
    message: `Роль должна быть одной из следующих ${Object.values(AppRole).join(', ')}`,
  })
  role?: AppRole;

  @IsOptional()
  @IsString()
  fullName?: string;
}
