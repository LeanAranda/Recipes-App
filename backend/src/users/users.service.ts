import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.prisma.user.create({ data: { ...userData, password: hashedPassword } });
    }

    async updateUser(id: number, userData: Partial<updateUserDto>) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        }
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return this.prisma.user.update({ 
            where: { id }, 
            data: userData 
        });
    }

    async deleteUser(email: string) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        }
        if (user.email !== email) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return this.prisma.user.delete({ where: { id: user.id } });
    }

    getUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async validateUser(email: string, password: string) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new HttpException(`Invalid email or password`, HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}