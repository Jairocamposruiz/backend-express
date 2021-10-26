import { Model, DataTypes, Sequelize, NOW } from 'sequelize';

import { CUSTOMER_TABLE } from './customer.model';


export const ORDER_TABLE = 'orders';

export const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: NOW,
  }
};

export class OrderModel extends Model {
  static associate (models: any) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    })
  }

  static config (sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}


