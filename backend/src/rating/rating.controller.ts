import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('rating')
export class RatingController {

    constructor(private ratingService: RatingService) {}

    @Get()
    getAllRatings() {
        return this.ratingService.getAllRatings();
    }

    @Get(':id')
    getRating(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.getRating(id);
    }

    @Get('recipe/:recipeId')
    getRatingsByRecipe(@Param('recipeId', ParseIntPipe) recipeId: number) {
        return this.ratingService.getRatingsByRecipe(recipeId);
    }

    @Post()
    createRating(@Body() ratingData: CreateRatingDto) {
        return this.ratingService.createRating(ratingData);
    }

    @Put(':id')
    updateRating(@Param('id', ParseIntPipe) id: number , @Body() ratingData: UpdateRatingDto) {
        return this.ratingService.updateRating(id, ratingData);
    }


    @Delete(':id')
    deleteRating(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.deleteRating(id);
    }

}
