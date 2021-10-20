import { Model, DataTypes, Sequelize, NOW } from 'sequelize';

import { CATEGORY_TABLE } from './category.model';


export const PRODUCT_TABLE = 'products';

export const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  isBlock: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: NOW,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};


export class ProductModel extends Model {
  static associate (models: any) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config (sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}
