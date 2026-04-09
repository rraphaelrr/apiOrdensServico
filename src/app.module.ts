import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServico } from './ordens/ordem-servico.entity';
import { OrdensModule } from './ordens/ordens.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'ordens',
      database: 'ordens_db',
      entities: [OrdemServico],
      synchronize: true,
    }),
    OrdensModule,
    AuthModule,
  ],
})
export class AppModule {}