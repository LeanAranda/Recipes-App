import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('rating')
export class RatingController {

    constructor(private ratingService: RatingService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las calificaciones' })
    @ApiResponse({ status: 200, description: 'Lista de calificaciones' })

    getAllRatings() {
        return this.ratingService.getAllRatings();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Obtener una calificación por ID' })
    @ApiResponse({ status: 200, description: 'La calificación con el ID especificado' })
    @ApiResponse({ status: 404, description: 'Calificación no encontrada' })

    getRating(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.getRating(id);
    }


    @Get('recipe/:recipeId')
    @ApiOperation({ summary: 'Obtener calificaciones para una receta específica' })
    @ApiResponse({ status: 200, description: 'Lista de calificaciones para la receta especificada' })
    @ApiResponse({ status: 404, description: 'Receta no encontrada' })

    getRatingsByRecipe(@Param('recipeId', ParseIntPipe) recipeId: number) {
        return this.ratingService.getRatingsByRecipe(recipeId);
    }


    @Post()
    @ApiOperation({ summary: 'Crear una nueva calificación' })
    @ApiResponse({ status: 201, description: 'Calificación creada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 404, description: 'Usuario o Receta no encontrados' })

    createRating(@Body() ratingData: CreateRatingDto, @Request() req) {
        const email = req.user?.email;
        return this.ratingService.createRating(ratingData, email);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una calificación' })
    @ApiResponse({ status: 200, description: 'Calificación actualizada' })
    @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 403, description: 'No autorizado para actualizar esta calificación' })

    updateRating(@Param('id', ParseIntPipe) id: number , @Body() ratingData: UpdateRatingDto, @Request() req) {
        const email = req.user?.email;
        return this.ratingService.updateRating(id, ratingData, email);
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una calificación' })
    @ApiResponse({ status: 200, description: 'Calificación eliminada' })
    @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
    @ApiResponse({ status: 403, description: 'No autorizado para eliminar esta calificación' })
    
    deleteRating(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const email = req.user?.email;
        return this.ratingService.deleteRating(id, email);
    }

}
