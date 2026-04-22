import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {

    constructor(private ratingService: RatingService) {}

    @Get()
    getAllRatings() {
        return this.ratingService.getAllRatings();
    }

    @Get(':id')
    getRating(@Param('id') id: string) {
        return this.ratingService.getRating(id);
    }

    @Get('recipe/:recipeId')
    getRatingsByRecipe(@Param('recipeId') recipeId: string) {
        return this.ratingService.getRatingsByRecipe(recipeId);
    }

    @Post()
    createRating() {
        return this.ratingService.createRating();
    }

    @Put(':id')
    updateRating(@Param('id') id: string) {
        return this.ratingService.updateRating(id);
    }


    @Delete(':id')
    deleteRating(@Param('id') id: string) {
        return this.ratingService.deleteRating(id);
    }

}
