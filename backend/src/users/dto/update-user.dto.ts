import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class updateUserDto {
    @ApiPropertyOptional({ description: 'Primer nombre del usuario', example: 'Pablo' })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiPropertyOptional({ description: 'Apellido del usuario', example: 'López' })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiPropertyOptional({ description: 'Correo electrónico del usuario', example: 'pablo.lopez@example.com' })
    @IsOptional()
    @IsString()
    email?: string;
    
    @ApiPropertyOptional({ description: 'Contraseña del usuario', example: 'password123' })
    @IsOptional()
    @IsString()
    password?: string;
}