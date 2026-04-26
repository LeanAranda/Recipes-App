import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })

    getAllUsers() {
        return this.userService.getAllUsers();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })

    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id);
    }


    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })

    createUser(@Body() userData: CreateUserDto) {
        return this.userService.createUser(userData);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })

    updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: updateUserDto) {
        return this.userService.updateUser(id, userData);
    }


    /*
    @Delete()
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 401, description: 'No autorizado' })

    deleteUser(@Request() req) {
        const email = req.user?.email;
        return this.userService.deleteUser(email);
    }
    */
}