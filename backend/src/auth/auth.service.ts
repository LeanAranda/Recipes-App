import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/generated/prisma/browser';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    register(userData: CreateUserDto){
        return this.usersService.createUser(userData);
    }

    async login(userData: User) {
        const payload = { sub: userData.id, firstName: userData.firstName, email: userData.email };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token, email: userData.email };
    }
}
