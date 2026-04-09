import { IsString, IsNumber } from 'class-validator';

export class CreateOrdemDto {
  @IsString()
  cliente: string;

  @IsString()
  descricao: string;

  @IsNumber()
  valor_estimado: number;
}