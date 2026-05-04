"use client";

import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/recipes/RecipeCard";
import type { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetchApi";

export default function MyRecipesPage() {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    async function loadRecipes() {
        try {
            const data = await fetchApi("/recipes/my-recipes");
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRecipes();
    }, []);

    if (loading) {
        return <div className="p-6 text-center bg-gray-100">Cargando recetas...</div>;
    } else if (recipes.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-fixed bg-cover bg-center recipes-container">
                    <Title>Mis recetas</Title>
                    <div className="p-6 text-center bg-gray-100 border border-gray-300 rounded-md">
                        No se encontraron recetas.
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-fixed bg-cover bg-center recipes-container">
                <Title>Mis recetas</Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} editable={true} loadRecipes={loadRecipes} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}