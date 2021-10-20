import { Sequelize } from 'sequelize';

import { UserModel, UserSchema } from './user.model';
import { CategoryModel, CategorySchema } from './category.model';
import { ProductModel, ProductSchema } from './product.model';
import { CustomerModel, CustomerSchema } from './customer.model';
import { OrderModel, OrderSchema } from './order.model';


function setupModels (sequelize: Sequelize) {
  UserModel.init(UserSchema, UserModel.config(sequelize));
  CategoryModel.init(CategorySchema, CategoryModel.config(sequelize));
  ProductModel.init(ProductSchema, ProductModel.config(sequelize));
  CustomerModel.init(CustomerSchema, CustomerModel.config(sequelize));
  OrderModel.init(OrderSchema, OrderModel.config(sequelize));

  UserModel.associate(sequelize.models);
  CustomerModel.associate(sequelize.models);
  CategoryModel.associate(sequelize.models);
  ProductModel.associate(sequelize.models);
  OrderModel.associate(sequelize.models);
}

export default setupModels;
