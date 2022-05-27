import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    

    @IsString()
    @IsNotEmpty()
    password: string;

}