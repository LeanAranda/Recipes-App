import { Controller, Get, HttpCode, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller({})
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get()
    index(@Req() req: Request, @Res() res: Response) {
        res.status(200).json({
            message: 'Hello World'
        });
    }

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
}