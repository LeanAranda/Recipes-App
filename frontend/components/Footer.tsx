export default function Footer() {
  return (
    <footer className="w-full bg-white text-black text-center py-4 mt-auto">
      <p className="text-md">
        © Lean Aranda 2026 | RecipesApp. 
      </p>
      <div className="mt-2 space-x-4">
        <a
          href="https://github.com/LeanAranda/recipes-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Repositorio
        </a>
        <a
          href="https://www.linkedin.com/in/leandroaranda"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}