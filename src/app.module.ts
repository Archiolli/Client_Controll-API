import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProcessoModule } from './modules/processos/processos.module';
import { LoggerMiddleware } from './modules/middlewares/logger.middleware';
import { ProcessoController } from './modules/processos/processos.controller';


@Module({
  imports: [ProcessoModule],
  controllers: [],
  providers: [],
})
export class AppModule {configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes(ProcessoController);
}}
