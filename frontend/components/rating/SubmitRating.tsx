"use client";

import { useState, useEffect  } from "react";
import RatingStars from "./RatingStars";
import { fetchApi } from "@/lib/fetchApi";
import type { RatingData } from "@/types/rating-data";
import toast from "react-hot-toast";

export default function SubmitRating({ RatingData, recipeId, onRatingSaved }: { RatingData?: RatingData, recipeId: number, onRatingSaved?: () => void;}) {
  const [score, setScore] = useState(RatingData?.score || 0);

  useEffect(() => {
    if (RatingData?.score) {
      setScore(RatingData.score);
    }
  }, [RatingData]);

  const handleSubmit = async () => {
    if (score === 0) return;
    try {
      if (RatingData) {
        // editar rating existente
        await fetchApi(`/rating/${RatingData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score }),
        });
      } else {
        // crear rating nuevo
        await fetchApi("/rating", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score, recipeId }),
        });
      }
      toast.success(`Calificación enviada!`);
      if (onRatingSaved) onRatingSaved();
    } catch (error) {
      toast.error("Error al enviar la calificación");
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <RatingStars onChange={setScore} score={score} />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={score === 0}
        className={`mt-4 px-4 py-2 rounded transition-colors duration-300 ${
          score === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "text-white submit-button"
        }`}
      >
        {RatingData ? "Actualizar Calificación" : "Enviar Calificación"}
      </button>
    </div>
  );
}