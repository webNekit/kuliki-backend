import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MinLength(4, { message: 'Минимальное кол-во символов' })
  @MaxLength(200, { message: 'Максимальное кол-во символов 200' })
  title: string;

  @IsString()
  @MinLength(20, { message: 'Минимальное кол-во символов 20' })
  content: string;

  @IsUUID(4, { message: 'Не правильный формат id' })
  @IsOptional()
  categoryId?: string;

  @IsOptional()
  published?: boolean;
}
