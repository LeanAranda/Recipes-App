import ImageUrlInput from "@/components/recipes/ImageUrlInput";
import { fetchApi } from "@/lib/fetchApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import type { RecipeData } from "@/types/recipe-data";

export default function RecipeForm( {recipeData} : {recipeData?: RecipeData} ) {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const fallbackImage =
            "https://res.cloudinary.com/dnuamvosm/image/upload/v1778003231/image-not-found_sicbdf.png";

        const rawImageUrl = (formData.get("imageUrl") as string) || "";

        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            ingredients: (formData.get("ingredients") as string)
                .split("\n")
                .map((i) => i.trim())
                .filter((i) => i),
            imageUrl: rawImageUrl.trim() === "" ? fallbackImage : rawImageUrl,
        };

        if (recipeData) {
            try {
                await fetchApi(`/recipes/${recipeData.id}`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                });
            } catch (error) {
                toast.error("Error al actualizar la receta");
                toast.error((error as Error).message);
                return;
            }
            toast.success("Receta actualizada!");
            redirect("/recipes/my-recipes");
        }

        try {
            await fetchApi("/recipes", {
                method: "POST",
                body: JSON.stringify(data),
            });
        } catch (error) {
            toast.error("Error al guardar la receta");
            toast.error((error as Error).message);
            return;
        }
        toast.success("Receta guardada!");
        redirect("/recipes/my-recipes");
    }


    return (
        <div className="mobile-bg mb-6 recipe-form-container">
            <div className="p-6 max-w-xxl mx-auto form-container">
                <form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col items-center justify-center">

                    <div className="space-y-6 w-full flex gap-6 recipe-form-content">
                        <div className="mb-4 w-full flex-col form-section">
                            <div className="mb-4 w-full">
                                <label htmlFor="title">Título</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="border p-2 w-full rounded"
                                    required
                                    defaultValue={recipeData?.title || ""}
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    defaultValue={recipeData?.description || ""}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <label htmlFor="ingredients">Ingredientes (separar por renglón)</label>
                                <textarea
                                    id="ingredients"
                                    name="ingredients"
                                    rows={5}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    defaultValue={recipeData?.ingredients?.join("\n") || ""}
                                ></textarea>
                            </div>
                        </div>

                        <div className="w-full flex-col form-section">
                            <ImageUrlInput oldUrl={recipeData?.imageUrl} />
                        </div>

                    </div>


                    <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition-colors submit-button">
                        Guardar receta
                    </button>
                </form>
            </div>
        </div>
    )
}