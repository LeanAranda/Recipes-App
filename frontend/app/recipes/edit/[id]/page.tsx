"use client";

import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import RecipeForm from "@/components/recipes/RecipeForm";
import { fetchApi } from "@/lib/fetchApi";
import { useEffect, useState } from "react";
import { useParams } from "next/dist/client/components/navigation";
import { RecipeData } from "@/types/recipe-data";
import toast from "react-hot-toast";
import { getUserIdFromToken } from "@/lib/getUserIdFromToken";

export default function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
    const userId = getUserIdFromToken();

    useEffect(() => {
        async function loadRecipe() {
            try {
                const data = await fetchApi(`/recipes/${id}`);
                setRecipeData(data);
            } catch (error) {
                toast.error("Error al cargar la receta");
            } finally {
                setLoading(false);
            }
        }

        loadRecipe();
    }, [id]);

    if (loading) return <div className="p-6 text-center bg-gray-100">Cargando receta...</div>;
    if (!recipeData) return <div className="p-6 text-center bg-gray-100">Receta no encontrada.</div>;
    if (recipeData.userId !== userId) return <div className="p-6 text-center bg-gray-100">Solo el propietario puede editar esta receta.</div>;

    return (
        <>
            <Navbar />
            <Title>Editar receta</Title>
            <div className="w-1/2 mx-auto recipe-form-page">
                <RecipeForm recipeData={recipeData} />
            </div>
            <Footer />
        </>
    );
}