import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {

    constructor(private prismaService: PrismaService) {}

    getAllRatings() {
        return this.prismaService.rating.findMany();
    }

    async getRating(id: number) {
        const rating = await this.prismaService.rating.findUnique({
            where: { id }
        });
        if (!rating) {
            throw new HttpException(`Rating not found`, HttpStatus.NOT_FOUND);
        }
        return rating;
    }

    async getRatingsByRecipe(recipeId: number) {
        const recipe = this.prismaService.recipe.findUnique({
            where: { id: recipeId }
        });
        if (!recipe) {
            throw new HttpException(`Recipe not found`, HttpStatus.NOT_FOUND);
        }
        return this.prismaService.rating.findMany({
            where: { recipeId }
        });
    }

    async createRating(ratingData: CreateRatingDto) {
        const rating = await this.prismaService.rating.findUnique({
            where: {
                userId_recipeId: {
                    userId: ratingData.userId,
                    recipeId: ratingData.recipeId
                }
            }
        });
        if (rating) {
            throw new HttpException(`You have already rated this recipe`, HttpStatus.BAD_REQUEST);
        }
        
        const user = await this.prismaService.user.findUnique({
            where: { id: ratingData.userId }
        });
        const recipe = await this.prismaService.recipe.findUnique({
            where: { id: ratingData.recipeId }
        });

        if (!user || !recipe) {
            throw new HttpException(`User or Recipe not found`, HttpStatus.NOT_FOUND);
        }

        return this.prismaService.rating.create({
            data: ratingData
        });
    }

    async updateRating(id: number, ratingData: UpdateRatingDto) {
        const rating = await this.prismaService.rating.findUnique({
            where: { id }
        });
        if (!rating) {
            throw new HttpException(`Rating not found`, HttpStatus.NOT_FOUND);
        }
        return this.prismaService.rating.update({
            where: { id },
            data: ratingData
        });
    }

    async deleteRating(id: number) {
        const rating = await this.prismaService.rating.findUnique({
            where: { id }
        });
        if (!rating) {
            throw new HttpException(`Rating not found`, HttpStatus.NOT_FOUND);
        }
        return this.prismaService.rating.delete({
            where: { id }
        });
    }
}
