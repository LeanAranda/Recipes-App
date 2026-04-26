import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateRecipeDto {
    @ApiPropertyOptional({ description: 'Título de la receta', example: 'Panqueques' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'Descripción de la receta', example: 'Receta para hacer panqueques riquísimos' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Lista de ingredientes', example: ['Harina', 'Huevos', 'Leche'] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ingredients?: string[];

    @ApiPropertyOptional({ description: 'URL de la imagen de la receta', example: 'https://example.com/panqueques.jpg' })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiPropertyOptional({ description: 'Indica si la receta está eliminada', example: false })
    @IsOptional()
    @IsBoolean()
    deleted?: boolean;
}