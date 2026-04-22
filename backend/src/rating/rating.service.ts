import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingService {

    getAllRatings() {
        return 'Obteniendo todas las valoraciones';
    }

    getRating(id: string) {
        return 'Obteniendo valoración';
    }

    getRatingsByRecipe(recipeId: string) {
        return 'Obteniendo valoraciones por receta';
    }

    createRating() {
        return 'Creando valoración';
    }

    updateRating(id: string) {
        return 'Actualizando valoración';
    }

    deleteRating(id: string) {
        return 'Eliminando valoración';
    }
}
