import { Cliente } from "@prisma/client";
import { IsArray, IsNumber, IsString } from "class-validator";


export class vistosDTO {
    @IsString()
    tipo: string;
    @IsNumber()
    userId : number
}

