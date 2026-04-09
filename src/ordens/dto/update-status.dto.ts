import { IsEnum } from 'class-validator';
import { StatusOrdem } from '../ordem-servico.entity';

export class UpdateStatusDto {
  @IsEnum(StatusOrdem)
  status: StatusOrdem;
}