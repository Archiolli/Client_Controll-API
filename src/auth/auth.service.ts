import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from './auth.dto';
import { UsersService } from 'src/entities/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';


@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async login(atualUser: loginDTO) {
        const user = await this.validateUser(atualUser)


        
        const payload = {
            id: user.id,
            email: user.email,
            sub: {
                nome: user.nome,
            }
        }
        // Data atual com moment
        const dataAtual = moment().add(7, 'hour').format('YYYY-MM-DD HH:mm:ss');

        const expiresIn = '7h'; // Tempo de expiração do token

        return {
            user,
            backEndTokens: {
                acssesToken: await this.jwtService.signAsync(payload, {
                    expiresIn,
                    secret: process.env.jwtSecretKey
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey
                })
            },
            exp: dataAtual
        };
    }


    async validateUser(atualUser: loginDTO) {
        const userExists = await this.userService.findByEmail(atualUser.email)

        if (userExists && (await compare(atualUser.senha, userExists.senha))) {

            const { senha, ...result } = userExists
            return result
        }

        throw new UnauthorizedException(`Usuário com o email ${atualUser.email} não autorizado!`)
    }
}
