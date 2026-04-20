import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    /* Endpoints para usuarios 
    @Get('/all')
    getAllUsers() {
        return this.userService.getUsers();
    }

    @Post()
    createUser() {
        return 'Creando usuario';
    }

    @Put()
    updateUser() {
        return 'Actualizando usuario';
    }

    @Delete()
    deleteUser() {
        return 'Eliminando usuario';
    }
        
    */
}