import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {

    constructor(private recipesService: RecipesService) {}

    @Get()
    getAllRecipes() {
        return this.recipesService.getAllRecipes();
    }

    @Get(':id')
    getRecipe(@Param('id', ParseIntPipe) id: number) {
        return this.recipesService.getRecipe(id);
    }

    @Get(':id/public')
    getPublicRecipe(@Param('id') id: string) {
        return this.recipesService.getPublicRecipe(id);
    }

    @Get('user/:userId')
    getRecipesByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.recipesService.getRecipesByUser(userId);
    }

    @Post()
    createRecipe(@Body() recipeData: CreateRecipeDto) {
        return this.recipesService.createRecipe(recipeData);
    }

    @Put(':id')
    updateRecipe(@Param('id', ParseIntPipe) id: number, @Body() recipeData: UpdateRecipeDto) {
        return this.recipesService.updateRecipe(id, recipeData);
    }

    @Delete(':id')
    deleteRecipe(@Param('id', ParseIntPipe) id: number) {
        return this.recipesService.deleteRecipe(id);
    }
}
