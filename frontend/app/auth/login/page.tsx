"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetchApi";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get("error");
        if (error) setErrorMsg(error);
    }, []);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        try {
            const data = await fetchApi("/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            localStorage.setItem("token", data.access_token);
            window.location.href = "/recipes";
        } catch (error) {
            window.location.href = `/login?error=${encodeURIComponent((error as Error).message)}`;
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto login-container">
            <h1 className="h1-login font-bold mb-4">Inicio de sesión</h1>
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
                <a href="/register" className="text-blue-600 mt-4 inline-block register-link">
                    ¿No tenés una cuenta? Registrate
                </a>
            </button>
            <p className="text-red-500 mt-4">
                {errorMsg}
            </p>
        </div>
    );
}