import { IsString } from "class-validator";

export class updateUserDto {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
}