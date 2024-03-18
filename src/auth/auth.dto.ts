import { IsDate, IsEmail, IsString, isString } from "class-validator";


export class loginDTO {

    @IsEmail()
    email: string;


    @IsString()
    senha: string;

    expiresIn: string;

}