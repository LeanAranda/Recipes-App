import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecipesService {

    constructor(private prisma: PrismaService, private userService: UsersService) {}

    getAllRecipes() {
        return this.prisma.recipe.findMany();
    }

    getAllActiveRecipes() {
        return this.prisma.recipe.findMany({
            where: { deleted: false }
        });
    }

    async getAllMyRecipes(email: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return this.prisma.recipe.findMany({
            where: { userId: user.id }
        });
    }

    async getRecipe(id: number) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id }
        });
        if (!recipe) {
            throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
        }
        return recipe;
    }

    async getPublicRecipe(publicId: string) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { publicId }
        });
        if (!recipe) {
            throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
        }
        return recipe;
    }

    getRecipesByUser(userId: number) {
        return this.prisma.recipe.findMany({
            where: { userId, deleted: false }
        });
    }

    async createRecipe(recipeData: CreateRecipeDto, email: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return this.prisma.recipe.create({
            data: {
                ...recipeData,
                userId: user.id,
                imageUrl: recipeData.imageUrl ?? 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
            }
        });
    }

    async updateRecipe(id: number, recipeData: Partial<UpdateRecipeDto>, email: string) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id }
        });
        const user = await this.userService.getUserByEmail(email);
        if (!recipe || !user) {
            throw new HttpException('Recipe or user not found', HttpStatus.NOT_FOUND);
        }
        if (recipe.userId !== user.id) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return this.prisma.recipe.update({
            where: { id },
            data: recipeData
        });
    }

    async softDeleteRecipe(id: number, email: string) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id }
        });
        const user = await this.userService.getUserByEmail(email);
        if (!recipe || !user) {
            throw new HttpException('Recipe or user not found', HttpStatus.NOT_FOUND);
        }
        if (recipe.userId !== user.id) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return this.prisma.recipe.update({
            where: { id },
            data: { deleted: true }
        });
    }

}
