export type RatingData = {
    id: number;
    score: number;
    recipeId: number;
    userId: number;
    user: {
        firstName: string;
        lastName: string;
    };
};