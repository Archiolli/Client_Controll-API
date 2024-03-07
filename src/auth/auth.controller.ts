import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/entities/users/users.dto';
import { UsersService } from 'src/entities/users/users.service';
import { loginDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private userService: UsersService,
        private authService: AuthService) { }

    @Post('register')
    async registerUser(@Body() dto: CreateUserDto) {

        try {
            return await this.userService.create(dto)
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Erro na execução: ${error}`,
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    @Post('login')
    async loginUser(@Body() user: loginDTO) {
        try {
            return await this.authService.login(user)
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Erro na execução: ${error}`,
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

}
