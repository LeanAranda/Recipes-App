import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    getUser(@Param('id') id: string) {
        return this.userService.getUser(id);
    }

    @Post()
    createUser(@Body() userData: CreateUserDto) {
        return this.userService.createUser();
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userData: updateUserDto) {
        return this.userService.updateUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}