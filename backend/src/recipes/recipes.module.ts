import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { PrismaService } from 'src/prisma.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [RecipesController],
  providers: [
    RecipesService, 
    PrismaService,
    UsersService,
    { provide: 'APP_GUARD', useClass: JwtGuard }
  ]
})
export class RecipesModule {}
