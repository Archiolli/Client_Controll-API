import { Cliente } from "@prisma/client";
import { IsArray, IsString } from "class-validator";


export class vistosDTO {
    @IsString()
    tipo: string;
    
}

