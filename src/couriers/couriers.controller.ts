import { Controller, Post, Body } from '@nestjs/common';
import { CouriersService } from './couriers.service';

@Controller('couriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Post()
  create(@Body() data: { name: string }) {
    return this.couriersService.create(data);
  }
}
