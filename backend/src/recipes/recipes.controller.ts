import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/constants/metadata';

@Controller('recipes')
export class RecipesController {

    constructor(private recipesService: RecipesService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las recetas activas' })
    @ApiResponse({ status: 200, description: 'Lista de recetas activas' })

    getAllActiveRecipes() {
        return this.recipesService.getAllActiveRecipes();
    }

    @Get('all')
    @ApiOperation({ summary: 'Obtener todas las recetas' })
    @ApiResponse({ status: 200, description: 'Lista de recetas' })

    getAllRecipes() {
        return this.recipesService.getAllRecipes();
    }

    @Get('my-recipes')
    @ApiOperation({ summary: 'Obtener todas las recetas del usuario' })
    @ApiResponse({ status: 200, description: 'Lista de mis recetas' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })

    getAllMyRecipes(@Request() req) {
        const email = req.user?.email;
        return this.recipesService.getAllMyRecipes(email);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una receta por ID' })
    @ApiResponse({ status: 200, description: 'La receta con el ID especificado' })
    @ApiResponse({ status: 404, description: 'Receta no encontrada' })

    getRecipe(@Param('id', ParseIntPipe) id: number) {
        return this.recipesService.getRecipe(id);
    }

    @Get(':id/public')
    @ApiOperation({ summary: 'Obtener una receta pública por su ID público' })
    @ApiResponse({ status: 200, description: 'La receta pública' })
    @ApiResponse({ status: 404, description: 'Receta no encontrada' })
    @Public()

    getPublicRecipe(@Param('id') id: string) {
        return this.recipesService.getPublicRecipe(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtener recetas por ID de usuario' })
    @ApiResponse({ status: 200, description: 'Lista de recetas' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })

    getRecipesByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.recipesService.getRecipesByUser(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva receta' })
    @ApiResponse({ status: 201, description: 'Receta creada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })

    createRecipe(@Body() recipeData: CreateRecipeDto, @Request() req) {
        const email = req.user?.email;
        return this.recipesService.createRecipe(recipeData, email);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una receta' })
    @ApiResponse({ status: 200, description: 'Receta actualizada' })
    @ApiResponse({ status: 404, description: 'Receta no encontrada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 401, description: 'No autorizado' })

    updateRecipe(@Param('id', ParseIntPipe) id: number, @Body() recipeData: UpdateRecipeDto, @Request() req) {
        const email = req.user?.email;
        return this.recipesService.updateRecipe(id, recipeData, email);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una receta (soft delete)' })
    @ApiResponse({ status: 200, description: 'Receta eliminada (soft delete)' })
    @ApiResponse({ status: 404, description: 'Receta no encontrada' })
    @ApiResponse({ status: 401, description: 'No autorizado' })

    softDeleteRecipe(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const email = req.user?.email;
        return this.recipesService.softDeleteRecipe(id, email);
    }
}
