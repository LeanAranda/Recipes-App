"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetchApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubmitRating from "@/components/rating/SubmitRating";
import type { RecipeData } from "@/types/recipe-data";
import type { RatingData } from "@/types/rating-data";
import Rating from "@/components/rating/Rating";
import toast from "react-hot-toast";
import { getUserIdFromToken } from "@/lib/getUserIdFromToken";

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
    const [ratings, setRatings] = useState<RatingData[]>([]);
    const userId = getUserIdFromToken();
    const myRating = ratings.find(r => r.userId === userId);

    async function loadRatings() {
        try {
            const ratings = await fetchApi(`/rating/recipe/${id}`);
            setRatings(ratings);
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
    }

    useEffect(() => {
        async function loadRecipe() {
            try {
                const data = await fetchApi(`/recipes/${id}`);
                setRecipeData(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        }

        loadRecipe();
        loadRatings();
    }, [id]);

    if (loading) return <div className="p-6 text-center">Cargando receta...</div>;
    if (!recipeData) return <div className="p-6 text-center">Receta no encontrada.</div>;

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center recipe-detail-container">
                <div className="flex flex-col justify-center bg-white shadow-md rounded-lg p-6 recipe-detail">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 recipe-detail-title">
                        {recipeData.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4 bg-gray-100 p-2 rounded recipe-detail-author">
                        Autor: {recipeData.author}
                    </p>
                    <div className="flex mb-6 recipe-detail-section">
                        <div className="recipe-detail-img-container">
                            <img
                                src={recipeData.imageUrl}
                                alt={recipeData.title}
                                className="w-150 h-100 object-cover rounded-lg shadow-md recipe-detail-img"
                            />
                        </div>
                        <div className="w-70 h-100 recipe-detail-ingredients">
                            <h2 className="text-2xl font-semibold text-gray-800">Ingredientes</h2>
                            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                                {recipeData.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-200 h-100 mb-6 recipe-detail-description">
                        <h2 className="text-2xl font-semibold text-gray-800">Descripción</h2>
                        <p className="text-lg text-gray-700 ">
                            {recipeData.description}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `${window.location.origin}/recipes/${recipeData.publicId}/public`
                            );
                            toast.success("Link copiado al portapapeles");
                        }}
                        className="text-white px-4 py-2 rounded submit-button recipe-detail-share-button mb-6"
                    >
                        Compartir esta receta mediante un link público
                    </button>
                    <div className="recipe-detail-ratings">
                        <h2 className="text-xl font-bold">Tu calificación</h2>
                        <SubmitRating
                            recipeId={recipeData.id}
                            RatingData={myRating}
                            onRatingSaved={loadRatings}
                        />
                        {ratings.length > 0 && (
                            <Rating ratings={ratings} />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}