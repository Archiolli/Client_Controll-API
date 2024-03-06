import { IsEmail, IsNumber, IsString } from "class-validator";


export class ProcessosDTO {

    @IsString()
    nome: string

    @IsEmail()
    email: string;

    @IsString()
    processo: string;

    @IsNumber()
    status: number;

}