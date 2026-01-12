import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { address: string; items: string[] }) {
    return this.prisma.order.create({
      data: {
        address: data.address,
        items: data.items,
        status: 'created',
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { courier: true },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async assignCourier(orderId: number, courierId: number) {
    const courier = await this.prisma.courier.findUnique({ where: { id: courierId } });
    
    if (!courier) throw new NotFoundException('Courier not found');
    if (courier.status !== 'active') {
      throw new BadRequestException('Courier is busy');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        courierId: courierId,
        status: 'delivery',
      },
    });
  }
}
