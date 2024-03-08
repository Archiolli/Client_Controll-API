import { Cliente } from "@prisma/client";
import { IsArray, IsNumber, IsString } from "class-validator";


export class ConsultorDTO {
    @IsString()
    nome: string;
}

