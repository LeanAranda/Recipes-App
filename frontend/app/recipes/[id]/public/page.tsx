"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetchApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { RecipeData } from "@/types/recipe-data";
import toast from "react-hot-toast";

export default function PublicRecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [recipeData, setRecipeData] = useState<RecipeData | null>(null);

    async function loadPublicRecipe() {
        try {
            const data = await fetchApi(`/recipes/${id}/public`);
            setRecipeData(data);
        } catch (error) {
            toast.error("Error al cargar la receta");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPublicRecipe();
    }, [id]);

    if (loading) return <div className="p-6 text-center bg-gray-100">Cargando receta...</div>;
    if (!recipeData) return <div className="p-6 text-center bg-gray-100">Receta no encontrada.</div>;
    if (recipeData.deleted) return <div className="p-6 text-center bg-gray-100">Esta receta ha sido eliminada.</div>;

    return (
        <>
            <Navbar isPublic={true} />
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
                </div>
            </div>
            <Footer />
        </>
    );
}