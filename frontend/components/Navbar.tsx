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
    <nav className="w-full bg-white text-black px-6 py-4 flex flex-col sm:flex-row justify-between items-center shadow nav-container">
      <div className="text-xl font-bold mb-2 sm:mb-0 nav-logo nav-button">
        <Link href="#">🍳 RecipesApp</Link>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 nav-links">
        {isPublic ? (
          <Link href="/auth/login" className="hover:text-yellow-600 nav-button">
            Iniciar sesión
          </Link>
        ) : (
          <>
            <Link href="/recipes/" className="hover:text-yellow-600 nav-button">
              Todas las recetas
            </Link>
            <Link href="/recipes/my-recipes" className="hover:text-yellow-600 nav-button">
              Mis recetas
            </Link>
            <Link href="/recipes/new" className="hover:text-yellow-600 nav-button">
              Crear receta
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-600 text-left sm:text-center logout nav-button"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
