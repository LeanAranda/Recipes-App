"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetchApi";
import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/recipes/RecipeCard";
import type { Recipe } from "@/types/recipe";

export default function RecipesPage() {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function loadRecipes() {
            try {
                const data = await fetchApi("/recipes");
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        }

        loadRecipes();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Cargando recetas...</div>;
    } else if (recipes.length === 0) {
        return <div className="p-6 text-center">No se encontraron recetas.</div>;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-fixed bg-cover bg-center recipes-container">
                <Title>Todas las recetas</Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}