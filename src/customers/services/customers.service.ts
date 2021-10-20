import boom from '@hapi/boom';

import { CreateCustomerDto, UpdateCustomerDto, GetCustomerDto } from '../dtos/customer.dto';
import sequelize from '../../common/database/sequelize';


const customerRepo = sequelize.models.Customer;

class CustomersService {
  constructor () {
  }

  async find () {
    return await customerRepo.findAll({
      include: ['user']
    });
  }

  async findOne (id: GetCustomerDto) {
    const customer = await customerRepo.findByPk(id);
    if (!customer) throw boom.notFound('Customer not found');

    return customer;
  }

  async create (payload: CreateCustomerDto) {
    try {
      await customerRepo.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async update (id: GetCustomerDto, payload: UpdateCustomerDto) {
    const customer = await customerRepo.findByPk(id);
    if (!customer) throw boom.notFound('Customer not found');

    return customer.update(payload);
  }

  async delete (id: GetCustomerDto) {
    const customer = await customerRepo.findByPk(id);
    if (!customer) throw boom.notFound('Customer not found');
    await customer.destroy();

    return {
      id,
      message: 'Customer was deleted',
    };
  }
}

export default CustomersService;
