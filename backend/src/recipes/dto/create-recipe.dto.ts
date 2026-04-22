import { IsNotEmpty, IsNumberString, IsString, MinLength} from "class-validator";

export class CreateRecipeDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    ingredients: string[];

    imageUrl: string;

    @IsNotEmpty()
    @IsNumberString()
    userId: string;
}