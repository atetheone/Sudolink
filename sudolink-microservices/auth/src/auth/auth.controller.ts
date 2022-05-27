import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthDto, UserCreateDto } from 'src/dtos'
import { UserService } from './auth.service';

@Controller('auth')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {

    }

    // @Get()
    // getUsers() {
    //     return this.userService.getUsers();
    // }

    // @Get(':username')
    // getUserByUsername(@Param() username) {

    // }

    @Post('register')
    async register(@Body() user: UserCreateDto) {
        return await this.userService.register(user);
    }

    @Post('login')
    login(@Body() user: AuthDto) {
        return this.userService.login(user);
    }
}
