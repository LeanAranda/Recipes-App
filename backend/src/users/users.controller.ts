import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users' })

    getAllUsers() {
        return this.userService.getAllUsers();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })

    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id);
    }


    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })

    createUser(@Body() userData: CreateUserDto) {
        return this.userService.createUser(userData);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'User updated' })
    @ApiResponse({ status: 404, description: 'User not found' })

    updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: updateUserDto) {
        return this.userService.updateUser(id, userData);
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'User deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}