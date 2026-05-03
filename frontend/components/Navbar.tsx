"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ isPublic = false }: { isPublic?: boolean }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-white text-black px-6 py-4 flex flex-col sm:flex-row justify-between items-center shadow">
      <div className="text-xl font-bold mb-2 sm:mb-0">
        <Link href="#">🍳 RecipesApp</Link>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
        {isPublic ? (
          <Link href="/auth/login" className="hover:text-yellow-600">
            Iniciar sesión
          </Link>
        ) : (
          <>
            <Link href="/recipes/" className="hover:text-yellow-600">
              Todas las recetas
            </Link>
            <Link href="/recipes/my-recipes" className="hover:text-yellow-600">
              Mis recetas
            </Link>
            <Link href="/recipes/new" className="hover:text-yellow-600">
              Crear receta
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-600 text-left sm:text-center logout"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
