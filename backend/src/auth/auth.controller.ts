import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/constants/metadata';

@Controller({})
export class AuthController {

    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Test endpoint' })
    @ApiResponse({ status: 200, description: 'Returns Hello World' })
    @Public()

    getHello(@Request() req) {
        return req.user ? `Hello ${req.user.email}` : 'Hello World';
    }

    @Post('register')
    @ApiOperation({ summary: 'Registra un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @Public()

    register(@Body() userData: CreateUserDto){
        return this.authService.register(userData);
    }

    @Post('login')
    @ApiOperation({ summary: 'Inicia sesión como usuario' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @Public()

    async login(@Body() userData: LoginUserDto) {
        const user = await this.usersService.validateUser(userData.email, userData.password);
        return this.authService.login(user);
    }
}