import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class UpdateRatingDto {
    @ApiProperty({ description: 'Puntuación de la receta entre 1 y 10', example: 8 })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10)
    score: number;
}