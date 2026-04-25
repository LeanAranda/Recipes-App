import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    recipeId: number;
    
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10)
    score: number;
}