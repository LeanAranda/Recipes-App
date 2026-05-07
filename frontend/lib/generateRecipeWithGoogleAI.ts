import toast from "react-hot-toast";

export async function generateRecipeWithGoogleAI(title: string): Promise<{ descripcion: string; ingredientes: string[] }> {
    if(title.trim().length === 0) {
        toast.error("Por favor ingresa un título para generar la receta");
        return { descripcion: "", ingredientes: [] };
    }

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Genera una receta para: ${title}.
Devuelve únicamente un JSON con este formato, con al menos 5 ingredientes:
{
  "descripcion": "texto medio de la receta",
  "ingredientes": [
    "ingrediente 1",
    "ingrediente 2",
    "ingrediente 3"
  ]
}
No agregues nada fuera del JSON.`
                            }
                        ]
                    }
                ]
            }),
        }
    );

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    if (!res.ok) {
        toast.error("La API de Google no está disponible en este momento... intenta más tarde");
        return { descripcion: "", ingredientes: [] };
    }

    try {
        return JSON.parse(text);
    } catch {
        toast.error("Error al generar la receta");
        return { descripcion: "", ingredientes: [] };
    }
}
