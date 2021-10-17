import boom from '@hapi/boom';

import { CreateProductDto, UpdateProductDto, GetProductDto } from '../dtos/product.dto';
import sequelize from '../../common/database/sequelize';


const productRepo = sequelize.models.Product;

class ProductsService {
  async find () {
    return await productRepo.findAll();
  }

  async findOne (id: GetProductDto) {
    const product = await productRepo.findByPk(id);

    if (!product) throw boom.notFound('Product not found');

    // console.log(product)
    // console.log(product.getDataValue(product));
    // if (product.isBlock) throw boom.conflict('Product is block');

    return product;
  }

  async create (payload: CreateProductDto) {
    try {
      await productRepo.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async update (id: GetProductDto, payload: UpdateProductDto) {
    const product = await productRepo.findByPk(id);
    if (!product) throw boom.notFound('Product not found');

    return product.update(payload);
  }

  async delete (id: GetProductDto) {
    const product = await productRepo.findByPk(id);
    if (!product) throw boom.notFound('Product not found');
    await product.destroy();

    return {
      id,
      message: 'Product was deleted'
    };
  }
}

export default ProductsService;
