import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {

    constructor(private prisma: PrismaService) {}

    getAllRecipes() {
        return this.prisma.recipe.findMany();
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
        //TODO link publico
        return recipe;
    }

    getRecipesByUser(userId: number) {
        return this.prisma.recipe.findMany({
            where: { userId }
        });
    }

    createRecipe(recipeData: CreateRecipeDto) {
        const user = this.prisma.user.findUnique({
            where: { id: recipeData.userId }
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return this.prisma.recipe.create({
            data: {
                ...recipeData,
                imageUrl: recipeData.imageUrl ?? 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
            }
        });
    }

    async updateRecipe(id: number, recipeData: Partial<UpdateRecipeDto>) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id }
        });
        if (!recipe) {
            throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
        }
        return this.prisma.recipe.update({
            where: { id },
            data: recipeData
        });
    }

    async deleteRecipe(id: number) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id }
        });
        if (!recipe) {
            throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
        }
        return this.prisma.recipe.delete({
            where: { id }
        });
    }
}
