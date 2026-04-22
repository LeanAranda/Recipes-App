import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsNumberString()
    userId: string;

    @IsNotEmpty()
    @IsNumberString()
    recipeId: string;
    
    @IsNotEmpty()
    @IsNumberString()
    rating: number;
}