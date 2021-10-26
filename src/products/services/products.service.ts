import boom from '@hapi/boom';
import { Op }  from 'sequelize';


import { CreateProductDto, UpdateProductDto, GetProductDto, QueryProductDto } from '../dtos/product.dto';
import sequelize from '../../common/database/sequelize';


const productRepo = sequelize.models.Product;

type Options = {
  include?: string[],
  limit?: number,
  offset?: number,
  where?: any,
}

class ProductsService {
  async find (query: QueryProductDto) {
    const options: Options = {
      include: ['category'],
      where: {}
    };

    const { limit, offset, price, price_min, price_max } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }

    return await productRepo.findAll(options);
  }

  async findOne (id: GetProductDto) {
    const product = await productRepo.findByPk(id, {
      include: ['category']
    });

    if (!product) throw boom.notFound('Product not found');

    // @ts-ignore
    if (product.isBlock) throw boom.conflict('Product is block');

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
