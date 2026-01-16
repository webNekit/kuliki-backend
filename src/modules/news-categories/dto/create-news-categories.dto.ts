import { IsOptional, IsString } from "class-validator";

export class CreateNewsCategoriesDto {
    @IsString()
    title: string;
    
    @IsString()
    @IsOptional()
    slug?: string;
}