import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

test.describe('Logistics Flow', () => {
  
  test.beforeAll(async () => {
    await prisma.order.deleteMany();
    await prisma.courier.deleteMany();
  });

  test('E2E: Create courier, create order, assign and check DB', async ({ request }) => {
    const courierRes = await request.post('/couriers', {
      data: { name: 'Dmitry Courier' }
    });
    expect(courierRes.ok()).toBeTruthy();
    const courier = await courierRes.json();

    const orderRes = await request.post('/orders', {
      data: { 
        address: 'Baker Street 221b', 
        items: ['Violin', 'Tea'] 
      }
    });
    expect(orderRes.ok()).toBeTruthy();
    const order = await orderRes.json();

    const assignRes = await request.post(`/orders/${order.id}/assign`, {
      data: { courierId: courier.id }
    });
    expect(assignRes.status()).toBe(201);

    const orderInDb = await prisma.order.findUnique({
      where: { id: order.id }
    });

    console.log('Order status in DB:', orderInDb?.status);

    expect(orderInDb).not.toBeNull();
    expect(orderInDb?.status).toBe('delivery');
    expect(orderInDb?.courierId).toBe(courier.id);
  });

  test.afterAll(async () => {
    await prisma.$disconnect();
  });
});