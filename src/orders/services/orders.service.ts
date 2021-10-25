import boom from '@hapi/boom';

import { CreateOrderDto, UpdateOrderDto, GetOrderDto } from '../dtos/order.dto';
import sequelize from '../../common/database/sequelize';


const orderRepo = sequelize.models.Order;

class OrdersService {
  async find () {
    return await orderRepo.findAll({
      include: ['customer']
    });
  }

  async findOne (id: GetOrderDto) {
    const order = await orderRepo.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });

    if (!order) throw boom.notFound('Order not found');

    return order;
  }

  async create (payload: CreateOrderDto) {
    try {
      await orderRepo.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async update (id: GetOrderDto, payload: UpdateOrderDto) {
    const order = await orderRepo.findByPk(id);
    if (!order) throw boom.notFound('Order not found');

    return order.update(payload);
  }

  async delete (id: GetOrderDto) {
    const order = await orderRepo.findByPk(id);
    if (!order) throw boom.notFound('Order not found');
    await order.destroy();

    return {
      id,
      message: 'Order was deleted'
    };
  }
}

export default OrdersService;
