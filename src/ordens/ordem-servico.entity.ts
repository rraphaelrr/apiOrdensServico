import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum StatusOrdem {
  ABERTA = 'Aberta',
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDA = 'Concluída',
  CANCELADA = 'Cancelada',
}

@Entity()
export class OrdemServico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente: string;

  @Column()
  descricao: string;

  @Column('decimal')
  valor_estimado: number;

  @Column({
    type: 'enum',
    enum: StatusOrdem,
    default: StatusOrdem.ABERTA,
  })
  status: StatusOrdem;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}