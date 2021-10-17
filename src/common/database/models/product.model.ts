import { Model, DataTypes, Sequelize, NOW, Optional } from 'sequelize';


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
  }
};


interface ProductAttributes {
  id: number,
  name: string,
  price: number,
  isBlock: boolean,
  image: string,
  createdAt: Date
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}


export class ProductModel extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public isBlock!: boolean;
  public image!: string;

  public readonly createdAt!: Date;

  static associate () {

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
