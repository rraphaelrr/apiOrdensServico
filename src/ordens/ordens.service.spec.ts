import { OrdensService } from './ordens.service';

describe('OrdensService', () => {
  let service: OrdensService;

  it('deve lançar erro ao concluir sem estar em andamento', async () => {
    const mockRepo: any = {
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        status: 'Aberta',
      }),
    };

    service = new OrdensService(mockRepo);

    await expect(
      service.atualizarStatus(1, 'Concluída' as any),
    ).rejects.toThrow();
  });

  it('não deve permitir alterar ordem cancelada', async () => {
    const mockRepo: any = {
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        status: 'Cancelada',
      }),
    };

    service = new OrdensService(mockRepo);

    await expect(service.atualizar(1, {})).rejects.toThrow();
  });
});