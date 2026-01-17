import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCallbackDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Минимальное кол-во символов 2' })
    @MaxLength(100, { message: 'Максимальная дилна символов 100' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(9, { message: 'Минимальное кол-во символов 9' })
    @MaxLength(100, { message: 'Максимальная дилна символов 100' })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'Минимальное кол-во символов 10' })
    @MaxLength(100, { message: 'Максимальная дилна символов 100' })
    message: string;
}