import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateRecipeDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ingredients?: string[];

    @IsOptional()
    @IsUrl()
    imageUrl?: string;
}