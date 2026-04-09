import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServico, StatusOrdem } from './ordem-servico.entity';

@Injectable()
export class OrdensService {
  constructor(
    @InjectRepository(OrdemServico)
    private repo: Repository<OrdemServico>,
  ) {}

  async criar(data: Partial<OrdemServico>) {
    const ordem = this.repo.create(data);
    return this.repo.save(ordem);
  }

  async listar() {
    return this.repo.find();
  }

  async atualizar(id: number, data: Partial<OrdemServico>) {
    const ordem = await this.buscarPorId(id);

    if (ordem.status === StatusOrdem.CANCELADA) {
      throw new BadRequestException('Ordem cancelada não pode ser alterada');
    }

    Object.assign(ordem, data);
    return this.repo.save(ordem);
  }

  async atualizarStatus(id: number, status: StatusOrdem) {
    const ordem = await this.buscarPorId(id);

    if (ordem.status === StatusOrdem.CANCELADA) {
      throw new BadRequestException('Ordem cancelada não pode ser alterada');
    }

    if (status === StatusOrdem.CONCLUIDA && ordem.status !== StatusOrdem.EM_ANDAMENTO) {
      throw new BadRequestException('Só pode concluir se estiver em andamento');
    }

    ordem.status = status;
    return this.repo.save(ordem);
  }

  private async buscarPorId(id: number) {
    const ordem = await this.repo.findOneBy({ id });
    if (!ordem) throw new NotFoundException('Ordem não encontrada');
    return ordem;
  }
}