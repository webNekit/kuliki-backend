import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsCategoriesDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
