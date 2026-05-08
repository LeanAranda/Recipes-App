# Recipes App - Frontend
Frontend en **Next.js + TypeScript** + **TailwindCss** para la app de recetas.
Proporciona una interfaz limpia e intuitiva para manejar usuarios, recetas y ratings. Se conecta con el backend en NestJS.

## Stack
- [NextJS](https://nextjs.org/)                     - Framework frontend en Node.js
- [TypeScript](https://www.typescriptlang.org/)     - Tipado estático
- [TailwindCss](https://tailwindcss.com/)           - Estilos y diseño de interfaz
- [Google AI Studio](https://aistudio.google.com/)  - Autocompletar recetas con IA
- [Cloudinary](https://cloudinary.com/)             - Repositorio y gestión de imágenes

## Funcionalidades principales
- Registro y login de usuarios
- CRUD de recetas
- Ratings de recetas
- Subida de imágenes a Cloudinary
- Autocompletar con IA (Gemini)
- Diseño responsive

## Rutas principales

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/` | Página de inicio / Redirige a login | No |
| `/auth/login` | Formulario de inicio de sesión | No |
| `/auth/register` | Registro de nuevos usuarios | No |
| `/recipes` | Listado general de recetas | Sí |
| `/recipes/my-recipes` | Recetas creadas por el usuario | Sí |
| `/recipes/new` | Formulario para crear nueva receta | Sí |
| `/recipes/edit/[id]` | Editar receta existente | Sí |
| `/recipes/[id]` | Detalle de una receta específica | Sí |
| `/recipes/[id]/public` | Vista pública de una receta compartida | No |


## Instalación de dependencias
Clonar el repositorio y entrar a la carpeta `frontend`:
```bash
git clone https://github.com/LeanAranda/Recipes-App
cd Recipes-App/frontend
npm install
```

## Configuración
1. En la carpeta raíz del frontend crear archivo `.env`
2. Agregar las siguientes variables de entorno:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloud
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
NEXT_PUBLIC_API_URL=http://localhost:4000   # o la URL de tu backend
NEXT_PUBLIC_GOOGLE_API_KEY=tu_api_key_de_gemini
```

> **IMPORTANTE:**  
> No son necesarias las credenciales de **Cloudinary** o **Google** si no tenés una key.  
> La aplicación seguirá funcionando, pero las funciones de **autocompletar con IA** y **cargar imagen desde el dispositivo** no estarán disponibles.

## Levantar el proyecto
```bash
npm run dev
```
El frontend estará disponible en http://localhost:3000/

## Deploy

El proyecto está preparado para deploy en [Vercel](https://vercel.com).  
Solo se necesita clonar el repositorio y configurar las variables de entorno en el dashboard.

## Acceso al deploy
La aplicación ya está deployada y disponible públicamente en Vercel: https://recipes-app-lean.vercel.app
