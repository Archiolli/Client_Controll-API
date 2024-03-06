import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './users.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }


    async create(user: CreateUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (userExists) throw new Error('User already exists');

        const newUser = await this.prisma.user.create({

            data:{
                ...user,
                senha: await hash(user.senha, 10)
            }

        });


        const { senha, ...rest} = newUser
         
        return rest;
    }

}
