import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from './jwt/jwt.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService, 
    UsersService,
    { provide: 'APP_GUARD', useClass: JwtGuard }
  ],
})
export class AuthModule {}
