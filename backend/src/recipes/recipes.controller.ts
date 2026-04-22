import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    getRecipe(@Param('id') id: string) {
        return this.recipesService.getRecipe(id);
    }

    @Get(':id/public')
    getPublicRecipe(@Param('id') id: string) {
        return this.recipesService.getPublicRecipe(id);
    }

    @Get('user/:userId')
    getRecipesByUser(@Param('userId') userId: string) {
        return this.recipesService.getRecipesByUser(userId);
    }

    @Post()
    createRecipe(@Body() recipeData: CreateRecipeDto) {
        return this.recipesService.createRecipe();
    }

    @Put(':id')
    updateRecipe(@Param('id') id: string, @Body() recipeData: UpdateRecipeDto) {
        return this.recipesService.updateRecipe(id);
    }

    @Delete(':id')
    deleteRecipe(@Param('id') id: string) {
        return this.recipesService.deleteRecipe(id);
    }
}
