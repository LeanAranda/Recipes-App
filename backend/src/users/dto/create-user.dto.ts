import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'Primer nombre del usuario', example: 'Pablo' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    firstName: string;

    @ApiProperty({ description: 'Apellido del usuario', example: 'López' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    lastName: string;

    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'pablo.lopez@example.com' })
    //@IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario', example: 'password123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}