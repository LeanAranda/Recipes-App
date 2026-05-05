"use client";

import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import RecipeForm from "@/components/recipes/RecipeForm";

export default function NewRecipePage() {
    return (
        <>
            <Navbar />
            <Title>Crear receta</Title>
            <div className="w-1/2 mx-auto recipe-form-page">
                <RecipeForm />
            </div>
            <Footer />
        </>
    );
}