import boom from '@hapi/boom';

import { CreateUserDto, UpdateUserDto, GetUserDto } from '../dtos/user.dto';
import sequelize from '../../common/database/sequelize';


const userRepo = sequelize.models.User;

class UsersService {
  constructor () {
  }

  async find () {
    return await userRepo.findAll();
  }


  async findOne (id: GetUserDto) {
    const user = await userRepo.findByPk(id);
    if (!user) throw boom.notFound('User not found');

    return user;
  }

  async create (payload: CreateUserDto) {
    try {
      await userRepo.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async update (id: GetUserDto, payload: UpdateUserDto) {
    const user = await userRepo.findByPk(id);
    if (!user) throw boom.notFound('User not found');

    return user.update(payload);
  }

  async delete (id: GetUserDto) {
    const user = await userRepo.findByPk(id);
    if (!user) throw boom.notFound('User not found');
    await user.destroy();

    return {
      id,
      message: 'User was deleted'
    };
  }
}


export default UsersService;
