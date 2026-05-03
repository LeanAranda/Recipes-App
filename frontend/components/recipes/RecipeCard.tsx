"use client";

import { useState } from "react";
import Link from "next/link";
import type { Recipe } from "@/types/recipe";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <div
            className="relative border rounded shadow overflow-hidden recipe-card group cursor-pointer"
            onClick={() => setShowOverlay(!showOverlay)}
        >
            <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2 mb-4">{recipe.title}</h2>

            <div
                className={`description-overlay absolute inset-x-0 bottom-0 transform transition-transform duration-300 animate-slide ${showOverlay ? "translate-y-0" : "translate-y-full"
                    } group-hover:translate-y-0`}
            >
                <p className="p-4 text-center line-clamp-6 mb-2 recipe-detail-description">{recipe.description}</p>
                <Link
                    href={`/recipes/${recipe.id}`}
                    className="inline-block bg-white text-black font-semibold px-4 py-2 rounded mb-4 hover:bg-gray-200 transition-colors"
                >
                    Ver receta
                </Link>
            </div>
        </div>
    );
}
