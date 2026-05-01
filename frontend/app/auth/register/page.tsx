"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/fetchApi";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    async function handleRegister(event: React.FormEvent) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMsg("Las contraseñas no coinciden");
            return;
        }

        try {
            await fetchApi("/register", {
                method: "POST",
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            toast.success("Usuario creado con éxito");
            router.push("/auth/login");
        } catch (error) {
            setErrorMsg("Error al crear el usuario");
            toast.error((error as Error).message);
        }
    }

    return (
        <div className="mobile-bg">
            <div className="p-6 max-w-md mx-auto form-container">
                <h1 className="h1-form font-bold mb-4 text-center">Bienvenido a RecipesApp🍳</h1>
                <h2 className="h2-form font-semibold mb-4 text-center text-xl">Completá el formulario para crear tu cuenta</h2>
                <form autoComplete="off" className="space-y-6" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="border p-2 w-full rounded"
                        required
                        autoComplete="off"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        minLength={3}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="border p-2 w-full rounded"
                        required
                        autoComplete="off"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        minLength={3}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 w-full rounded"
                        required
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="border p-2 w-full rounded"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                    />
                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        className="border p-2 w-full rounded"
                        required
                        autoComplete="off"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={6}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full submit-button"
                    >
                        Registrarse
                    </button>
                </form>
                <button>
                    <a href="/auth/login" className="text-blue-600 mt-4 inline-block login-register-link">
                        ¿Ya tenés una cuenta? Inicia sesión
                    </a>
                </button>
                <p className="text-red-500 mt-4">
                    {errorMsg}
                </p>
            </div>
        </div>
    );
}