import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RatingService {

    constructor(private prismaService: PrismaService, private userService: UsersService) {}

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
        const recipe = await this.prismaService.recipe.findUnique({
            where: { id: recipeId }
        });
        if (!recipe) {
            throw new HttpException(`Recipe not found`, HttpStatus.NOT_FOUND);
        }
        return this.prismaService.rating.findMany({
            where: { recipeId }
        });
    }

    async createRating(ratingData: CreateRatingDto, email: string) {
        const user = await this.userService.getUserByEmail(email);
        const recipe = await this.prismaService.recipe.findUnique({
            where: { id: ratingData.recipeId }
        });
        if (!user || !recipe) {
            throw new HttpException(`User or Recipe not found`, HttpStatus.NOT_FOUND);
        }
        const rating = await this.prismaService.rating.findUnique({
            where: {
                userId_recipeId: {
                    userId: user.id,
                    recipeId: ratingData.recipeId
                }
            }
        });
        if (rating) {
            throw new HttpException(`You have already rated this recipe`, HttpStatus.BAD_REQUEST);
        }
        return this.prismaService.rating.create({
            data: {
                userId: user.id,
                recipeId: ratingData.recipeId,
                score: ratingData.score
            }
        });
    }

    async updateRating(id: number, ratingData: UpdateRatingDto, email: string) {
        const user = await this.userService.getUserByEmail(email);
        const rating = await this.prismaService.rating.findUnique({
            where: { id }
        });
        if (!rating || !user) {
            throw new HttpException(`Rating not found`, HttpStatus.NOT_FOUND);
        }
        if (rating.userId !== user.id) {
            throw new HttpException(`You can only update your own ratings`, HttpStatus.FORBIDDEN);
        }
        return this.prismaService.rating.update({
            where: { id },
            data: ratingData
        });
    }

    async deleteRating(id: number, email: string) {
        const user = await this.userService.getUserByEmail(email);
        const rating = await this.prismaService.rating.findUnique({
            where: { id }
        });
        if (!rating || !user) {
            throw new HttpException(`Rating or user not found`, HttpStatus.NOT_FOUND);
        }
        if (rating.userId !== user.id) {
            throw new HttpException(`You can only delete your own ratings`, HttpStatus.FORBIDDEN);
        }
        return this.prismaService.rating.delete({
            where: { id }
        });
    }
}
