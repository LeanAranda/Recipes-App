import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService, 
        PrismaService,
        { provide: 'APP_GUARD', useClass: JwtGuard }
    ],
})

export class UsersModule {}