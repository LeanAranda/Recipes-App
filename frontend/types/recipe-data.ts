export type RecipeData = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  author: string;
  publicId: string;
  deleted: boolean;
  userId: number;
};