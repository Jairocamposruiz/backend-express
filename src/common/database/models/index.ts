import { Sequelize } from 'sequelize';

import { UserModel, UserSchema } from './user.model';
import { CategoryModel, CategorySchema } from './category.model';
import { ProductModel, ProductSchema } from './product.model';


function setupModels (sequelize: Sequelize) {
  UserModel.init(UserSchema, UserModel.config(sequelize));
  CategoryModel.init(CategorySchema, CategoryModel.config(sequelize));
  ProductModel.init(ProductSchema, ProductModel.config(sequelize));
}

export default setupModels;
