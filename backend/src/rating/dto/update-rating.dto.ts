import { IsNotEmpty, IsNumberString } from "class-validator";

export class UpdateRatingDto {
    @IsNotEmpty()
    @IsNumberString()
    rating: number;
}