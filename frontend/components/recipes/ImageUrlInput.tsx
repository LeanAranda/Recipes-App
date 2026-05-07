"use client";
import { useState } from "react";

export default function ImageUrlInput({ oldUrl }: { oldUrl?: string }) {
  const [imageUrl, setImageUrl] = useState(oldUrl || "");

  // Imagen por defecto cuando la URL falla
  const fallbackImage =
    "/image-not-found.png";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  }

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
      
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cargar imagen desde tu dispositivo
        </label>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-500 file:text-white
                     hover:file:bg-gray-200 hover:file:text-gray-700"
        />
      </div>
      
    </div>
  );
}
