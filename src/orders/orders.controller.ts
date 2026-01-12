import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() data: { address: string; items: string[] }) {
    return this.ordersService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post(':id/assign')
  assignCourier(@Param('id') id: string, @Body() data: { courierId: number }) {
    return this.ordersService.assignCourier(+id, data.courierId);
  }
}