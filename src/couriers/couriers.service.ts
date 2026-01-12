import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CouriersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string }) {
    return this.prisma.courier.create({
      data: {
        name: data.name,
        status: 'active',
      },
    });
  }
}
