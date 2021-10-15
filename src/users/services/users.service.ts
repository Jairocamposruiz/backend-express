import boom from '@hapi/boom';

import { CreateUserDto, UpdateUserDto, GetUserDto } from '../dtos/user.dto';
import pool from '../../common/database/postgres.pool';


class UsersService {
  pool;

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err: Error) => console.error(err))
  }

  async find () {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
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
