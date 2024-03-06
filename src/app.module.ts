import { Module } from '@nestjs/common';
import { ProcessoModule } from './modules/processos/processos.module';


@Module({
  imports: [ProcessoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
