import boom from '@hapi/boom';

import { CreateUserDto, UpdateUserDto, GetUserDto } from '../dtos/user.dto';


class UsersService {

  async find () {
    return { message: "Todo correcto" }
  }

  async findOne (id: GetUserDto) {
  }

  async create (payload: CreateUserDto) {
  }

  async update (id: GetUserDto, payload: UpdateUserDto) {
  }

  async delete (id: GetUserDto) {
  }
}


export default UsersService;
