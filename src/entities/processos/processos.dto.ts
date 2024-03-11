import { IsNumber, IsString } from "class-validator";


export class ProcessosDTO {
    @IsString()
    nome: string
    @IsString()
    profissao: string;
    @IsString()
    docs: string;
    @IsNumber()
    consultorId: number;
    @IsString()
    fase: string;
    @IsString()
    observacao: string;
    @IsString()
    prazoAplicacao: string;
    @IsString()
    prioridade: string;
    @IsString()
    empresaAberta: string;
    @IsString()
    businessPlan: string;
    @IsString()
    diploma: string;
    @IsString()
    historico: string;
    @IsString()
    equivalencia: string;
    @IsString()
    lor: string;
    @IsString()
    status: string;
    @IsNumber()
    vistoId: number;
    @IsNumber()
    userId: number;
}