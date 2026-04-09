import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServico } from './ordem-servico.entity';
import { OrdensService } from './ordens.service';
import { OrdensController } from './ordens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrdemServico])],
  providers: [OrdensService],
  controllers: [OrdensController],
})
export class OrdensModule {}