"use client";
import { useState } from "react";
import { fetchApi } from "@/lib/fetchApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        try {
            const data = await fetchApi("/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            localStorage.setItem("token", data.access_token);
            toast.success("¡Bienvenido de nuevo!");
            router.push("/recipes");
        } catch (error) {
            setErrorMsg("Error al iniciar sesión");
            toast.error((error as Error).message);
        }
    }

    return (
        <div className="mobile-bg">
            <div className="p-6 max-w-md mx-auto form-container">
                <h1 className="h1-form font-bold mb-4 text-center">Bienvenido a RecipesApp🍳</h1>
                <h2 className="h2-form font-semibold mb-4 text-center text-xl">Iniciá sesión para continuar</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full submit-button"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <button>
                    <a href="/auth/register" className="text-blue-600 mt-4 inline-block login-register-link">
                        ¿No tenés una cuenta? Registrate
                    </a>
                </button>
                <p className="text-red-500 mt-4">
                    {errorMsg}
                </p>
            </div>
        </div>
    );
}