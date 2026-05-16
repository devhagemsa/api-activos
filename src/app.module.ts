import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivosModule } from './activos.module';

@Module({
  imports: [ActivosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
