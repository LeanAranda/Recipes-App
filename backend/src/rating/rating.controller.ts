import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('rating')
export class RatingController {

    constructor(private ratingService: RatingService) {}

    @Get()
    @ApiOperation({ summary: 'Get all ratings' })
    @ApiResponse({ status: 200, description: 'List of ratings' })
    
    getAllRatings() {
        return this.ratingService.getAllRatings();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get a rating by ID' })
    @ApiResponse({ status: 200, description: 'The rating with the specified ID' })
    @ApiResponse({ status: 404, description: 'Rating not found' })

    getRating(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.getRating(id);
    }


    @Get('recipe/:recipeId')
    @ApiOperation({ summary: 'Get ratings for a specific recipe' })
    @ApiResponse({ status: 200, description: 'List of ratings for the specified recipe' })
    @ApiResponse({ status: 404, description: 'Recipe not found' })

    getRatingsByRecipe(@Param('recipeId', ParseIntPipe) recipeId: number) {
        return this.ratingService.getRatingsByRecipe(recipeId);
    }


    @Post()
    @ApiOperation({ summary: 'Create a new rating' })
    @ApiResponse({ status: 201, description: 'Rating created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })

    createRating(@Body() ratingData: CreateRatingDto) {
        return this.ratingService.createRating(ratingData);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Update a rating' })
    @ApiResponse({ status: 200, description: 'Rating updated' })
    @ApiResponse({ status: 404, description: 'Rating not found' })
    @ApiResponse({ status: 400, description: 'Invalid input' })

    updateRating(@Param('id', ParseIntPipe) id: number , @Body() ratingData: UpdateRatingDto) {
        return this.ratingService.updateRating(id, ratingData);
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete a rating' })
    @ApiResponse({ status: 200, description: 'Rating deleted' })
    @ApiResponse({ status: 404, description: 'Rating not found' })

    deleteRating(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.deleteRating(id);
    }

}
