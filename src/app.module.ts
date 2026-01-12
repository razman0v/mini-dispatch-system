import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CouriersModule } from './couriers/couriers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CouriersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
