import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength} from "class-validator";

export class CreateRecipeDto {
    @ApiProperty({ description: 'Título de la receta', example: 'Panqueques' })
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    title: string;

    @ApiProperty({ description: 'Descripción de la receta', example: 'Receta para hacer panqueques riquísimos' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'Lista de ingredientes', example: ['Harina', 'Huevos', 'Leche'] })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    ingredients: string[];

    @ApiProperty({ description: 'URL de la imagen de la receta', example: 'https://example.com/panqueques.jpg' })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiProperty({ description: 'ID del usuario que crea la receta', example: 1 })
    @IsNotEmpty()
    @IsInt()
    userId: number;
}