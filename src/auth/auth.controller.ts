import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/entities/users/users.dto';
import { UsersService } from 'src/entities/users/users.service';

@Controller('auth')
export class AuthController {

    constructor (private userService: UsersService) { }

    @Post()
    async registerUser(@Body() dto: CreateUserDto){
        return await this.userService.create(dto)
    }

}
