# Recipes App - Backend
Backend en **NestJS + Prisma + PostgreSQL** para la app de recetas.
Expone una API REST para manejar usuarios, recetas y ratings con inicio de sesión y autenticación segura.

## Stack
- [NestJS](https://nestjs.com/)                     - Framework backend en Node.js
- [Prisma](https://www.prisma.io/)                  - ORM para base de datos
- [PostgreSQL](https://www.postgresql.org/)         - Base de datos
- [TypeScript](https://www.typescriptlang.org/)     - Tipado estático
- [JWT (JSON Web Token)](https://jwt.io/)           – Autenticación basada en tokens
- [Swagger](https://swagger.io/tools/swagger-ui/)   – Documentación interactiva de la API

## Instalación de dependencias
Clonar el repositorio y entrar a la carpeta `backend`:
```bash
git clone https://github.com/LeanAranda/Recipes-App
cd Recipes-App/backend
npm install
```

## Configuración
1. En la carpeta raíz del backend crear archivo `.env` con la conexión a PostgreSQL y la clave para JWT:
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/recipes"
   JWT_SECRET="jwt_secret_key"
   ```
2. Crear la base de datos:
   ```bash
   CREATE DATABASE recipes;
   ```
3. Generar cliente Prisma y aplicar migraciones:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Levantar el proyecto
```bash
npm run start:dev
```
El backend estará disponible en http://localhost:4000

## Prisma Studio para visualizar y editar datos
```bash
npx prisma studio
```

## Documentación con Swagger
Swagger UI está habilitado en el proyecto.
Se puede acceder a la documentación de la api en:
```url
http://localhost:4000/api
```
También se encuentra disponible en formato [pdf](./docs/swagger/RecipesAPI.pdf) dentro de la carpeta **docs**, junto con el [DER](./docs/database/recipes.pdf) de la base de datos.

## Deploy
Este proyecto está configurado y deployado en Render con base de datos PostgreSQL.
El archivo render.yaml se encuentra en la raíz del repositorio.

Se puede acceder al deploy de la api en:
https://recipes-app-backend-huze.onrender.com
para interactuar con postman o thunder client.

## Autenticación JWT
* Registro: `POST /register` → crea un usuario.
* Login: `POST /login` → devuelve un token JWT.
* El resto de rutas están protegidas: requieren header `Authorization: Bearer <token>`.
