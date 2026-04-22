import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [UsersModule, AuthModule, RecipesModule, RatingModule],
})
export class AppModule {}