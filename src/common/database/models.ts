import { Sequelize } from 'sequelize';

import { User, UserSchema } from '../../users/entities/User';


function setupModels (sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize));


}

export default setupModels;
