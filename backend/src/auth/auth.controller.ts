import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller({})
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get()
    getHello(){
        return "hello world";
    }

    /* test functions ---------------------------------------
    
    // express response
    @Get()
    index(@Req() req: Request, @Res() res: Response) {
        res.status(200).json({
            message: 'Hello World'
        });
    }

    // http code
    @Get('notfound')
    @HttpCode(404)
    notFound(){
        return 'Not Found';
    }

    @Get('error')
    @HttpCode(500)
    error(){
        return 'Error';
    }

    // parse int pipe
    @Get('test/:num')
    test(@Param('num', ParseIntPipe) num: number){
        return num + 100;
    }

    // parse boolean pipe
    @Get('test2/:boolean')
    test2(@Param('boolean', ParseBoolPipe) boolean: boolean){
        return boolean;
    }

    // custom pipe
    // guard
    @Get('greet')
    @UseGuards(AuthGuard)
    greet(@Query(ValidateuserPipe) query: { name: string, age: number }){
        return `Hello ${query.name}, you are ${query.age} years old`;
    }
    */
}