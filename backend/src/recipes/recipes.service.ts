import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipesService {

    getAllRecipes() {
        return 'Obteniendo todas las recetas';
    }

    getRecipe(id: string) {
        return 'Obteniendo receta';
    }

    getPublicRecipe(id: string) {
        return 'Obteniendo receta pública';
    }

    getRecipesByUser(userId: string) {
        return 'Obteniendo recetas por usuario';
    }

    createRecipe() {
        return 'Creando receta';
    }

    updateRecipe(id: string) {
        return 'Actualizando receta';
    }

    deleteRecipe(id: string) {
        return 'Eliminando receta';
    }
}
