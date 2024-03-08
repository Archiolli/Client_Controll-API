import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './entities/users/users.service';
import { UsersModule } from './entities/users/users.module';
import { ProcessoController } from './entities/processos/processos.controller';
import { LoggerMiddleware } from './entities/middlewares/logger.middleware';
import { ProcessoModule } from './entities/processos/processos.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { VistosModule } from './entities/vistos/vistos.module';
import { ConsultorModule } from './entities/consultor/consultor.module';


@Module({
  imports: [ProcessoModule, UsersModule, AuthModule, VistosModule, ConsultorModule ],
  controllers: [],
  providers: [UsersService, PrismaService],
})
export class AppModule {configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes(ProcessoController);
}}
