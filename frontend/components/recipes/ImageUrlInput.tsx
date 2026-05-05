"use client";
import { useState } from "react";

export default function ImageUrlInput({ oldUrl }: { oldUrl?: string }) {
  const [imageUrl, setImageUrl] = useState(oldUrl || "");

  // Imagen por defecto cuando la URL falla
  const fallbackImage =
    "/image-not-found.png";

  return (
    <div className="mb-4 w-full flex flex-col gap-4">
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          URL de la imagen
        </label>

        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="border rounded-md overflow-hidden">
        <img
          src={imageUrl || fallbackImage}
          alt="Vista previa"
          className="w-full max-h-64 object-cover"
          onError={(e) => {
            // si falla la carga, reemplaza por la imagen fallback
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }}
        />
      </div>
      
      {/*
      <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition-colors submit-button">
        Cargar imagen desde tu dispositivo
      </button>
      */}
    </div>
  );
}
