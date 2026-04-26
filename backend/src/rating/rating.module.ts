import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { PrismaService } from 'src/prisma.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [RatingController],
  providers: [
    RatingService, 
    UsersService,
    PrismaService, 
    { provide: 'APP_GUARD', useClass: JwtGuard }
  ]
})
export class RatingModule {}
