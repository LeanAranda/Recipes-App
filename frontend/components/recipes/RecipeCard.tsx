"use client";

import { useState } from "react";
import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import { fetchApi } from "@/lib/fetchApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RecipeCard({ recipe, editable, loadRecipes }: { recipe: Recipe; editable?: boolean; loadRecipes: () => void; }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        try {
            await fetchApi(`/recipes/${recipe.id}`, {
                method: "DELETE",
            });
            toast.success("Receta eliminada correctamente");
            loadRecipes();
        } catch (error) {
            toast.error("No se pudo eliminar la receta");
        }
    }

    async function handleRestore() {
        try {
            await fetchApi(`/recipes/${recipe.id}`, {
                method: "PUT",
                body: JSON.stringify({ deleted: false }),
            });
            toast.success("Receta restaurada correctamente");
            loadRecipes();
        } catch (error) {
            toast.error("No se pudo restaurar la receta");
        }
    }

    return (
        <div
            className="relative border rounded shadow overflow-hidden recipe-card group cursor-pointer"
            onClick={() => setShowOverlay(!showOverlay)}
        >
            {recipe.deleted === true && (
                <div className="absolute top-0 right-0 bg-red-500 bg-opacity-75 px-3 py-1 rounded-bl-lg z-10">
                    <span className="text-white text-sm font-bold">Oculta para los demás</span>
                </div>
            )}
            <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-80 h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2 mb-4">{recipe.title}</h2>

            <div
                className={
                    `description-overlay absolute inset-x-0 bottom-0 transform transition-transform duration-300 animate-slide group-hover:translate-y-0
                    ${showOverlay ? "translate-y-0" : "translate-y-full"} 
                    ${editable ? "edit-options" : ""}
                `}
            >
                {!editable && (
                    <p className="p-4 text-center line-clamp-6 mb-2 recipe-slide-description">{recipe.description}</p>
                )}
                <Link
                    href={`/recipes/${recipe.id}`}
                    className="inline-block bg-white text-black font-semibold px-4 py-2 rounded mb-4 hover:bg-gray-200 transition-colors"
                >
                    Ver receta
                </Link>
                {editable && (
                    <div className="flex flex-row gap-4">
                        <Link
                            href={`/recipes/edit/${recipe.id}`}
                            className="inline-block bg-white text-black font-semibold px-4 py-2 rounded mb-4 hover:bg-gray-200 transition-colors"
                        >
                            Editar
                        </Link>

                        {recipe.deleted === false ? (
                            <button
                                onClick={handleDelete}
                                className="inline-block bg-white text-black font-semibold px-4 py-2 rounded mb-4 hover:bg-gray-200 transition-colors delete-button"
                            >
                                <img src="/icons/delete-svgrepo-com.svg" alt="Eliminar" className="w-6 h-6" />
                            </button>
                        ) : (
                            <button
                                onClick={handleRestore}
                                className="inline-block bg-white text-black font-semibold px-4 py-2 rounded mb-4 hover:bg-gray-200 transition-colors restore-button"
                            >
                                <img src="/icons/restore-svgrepo-com.svg" alt="Restaurar" className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
