import { IsOptional, IsString } from "class-validator";

export class updateUserDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    email?: string;
    
    @IsOptional()
    @IsString()
    password?: string;
}