import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength} from "class-validator";

export class CreateRecipeDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    ingredients: string[];

    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @IsNotEmpty()
    @IsInt()
    userId: number;
}