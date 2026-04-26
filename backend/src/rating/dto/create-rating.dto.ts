import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateRatingDto {
    /*
    @ApiProperty({ description: 'ID del usuario que hace la valoración', example: 1 })
    @IsNotEmpty()
    @IsInt()
    userId: number;
    */

    @ApiProperty({ description: 'ID de la receta que se valora', example: 1 })
    @IsNotEmpty()
    @IsInt()
    recipeId: number;
    
    @ApiProperty({ description: 'Puntuación de la receta entre 1 y 10', example: 8 })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10)
    score: number;
}