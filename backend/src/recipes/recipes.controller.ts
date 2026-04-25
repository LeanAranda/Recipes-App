import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('recipes')
export class RecipesController {

    constructor(private recipesService: RecipesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all recipes' })
    @ApiResponse({ status: 200, description: 'List of recipes' })
    getAllRecipes() {
        return this.recipesService.getAllRecipes();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a recipe by ID' })
    @ApiResponse({ status: 200, description: 'The recipe' })
    @ApiResponse({ status: 404, description: 'Recipe not found' })
    getRecipe(@Param('id', ParseIntPipe) id: number) {
        return this.recipesService.getRecipe(id);
    }

    @Get(':id/public')
    @ApiOperation({ summary: 'Get a public recipe by its public ID' })
    @ApiResponse({ status: 200, description: 'The public recipe' })
    @ApiResponse({ status: 404, description: 'Recipe not found' })
    getPublicRecipe(@Param('id') id: string) {
        return this.recipesService.getPublicRecipe(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get recipes by user ID' })
    @ApiResponse({ status: 200, description: 'List of recipes' })
    @ApiResponse({ status: 404, description: 'User not found' })
    getRecipesByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.recipesService.getRecipesByUser(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new recipe' })
    @ApiResponse({ status: 201, description: 'Recipe created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    createRecipe(@Body() recipeData: CreateRecipeDto) {
        return this.recipesService.createRecipe(recipeData);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a recipe' })
    @ApiResponse({ status: 200, description: 'Recipe updated' })
    @ApiResponse({ status: 404, description: 'Recipe not found' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    updateRecipe(@Param('id', ParseIntPipe) id: number, @Body() recipeData: UpdateRecipeDto) {
        return this.recipesService.updateRecipe(id, recipeData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a recipe' })
    @ApiResponse({ status: 200, description: 'Recipe deleted' })
    @ApiResponse({ status: 404, description: 'Recipe not found' })
    deleteRecipe(@Param('id', ParseIntPipe) id: number) {
        return this.recipesService.deleteRecipe(id);
    }
}
