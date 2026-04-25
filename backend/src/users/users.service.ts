import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}

    getAllUsers() {
        return this.prisma.user.findMany();
    }

    async getUser(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async createUser(userData: CreateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { email: userData.email } });
        if (user) {
            throw new HttpException('The email is already registered', HttpStatus.BAD_REQUEST);
        }
        return this.prisma.user.create({ data: userData });
    }

    async updateUser(id: number, userData: Partial<updateUserDto>) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        }
        return this.prisma.user.update({ 
            where: { id }, 
            data: userData 
        });
    }

    async deleteUser(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        }
        return this.prisma.user.delete({ where: { id } });
    }
}