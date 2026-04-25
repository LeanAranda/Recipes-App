import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id);
    }

    @Post()
    createUser(@Body() userData: CreateUserDto) {
        return this.userService.createUser(userData);
    }

    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: updateUserDto) {
        return this.userService.updateUser(id, userData);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}