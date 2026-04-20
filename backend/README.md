# Recipes App - Backend
Backend en **NestJS + Prisma + PostgreSQL** para la app de recetas.
Expone una API REST para manejar usuarios, recetas y ratings.

## Stack
- [NestJS](https://nestjs.com/)                     - Framework backend en Node.js
- [Prisma](https://www.prisma.io/)                  - ORM para base de datos
- [PostgreSQL](https://www.postgresql.org/)         - Base de datos
- [TypeScript](https://www.typescriptlang.org/)     - Tipado estático

## Configuración
1. Crear archivo `.env` con la conexión a PostgreSQL:
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/recipes"
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
El backend estará disponible en http://localhost:4000/api

## Prisma Studio para visualizar y editar datos
```bash
npx prisma studio
```