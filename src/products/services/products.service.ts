import boom from '@hapi/boom';
const faker = require('faker');

import {CreateProductDto, UpdateProductDto, GetProductDto } from '../dtos/product.dto';


class ProductsService {
  products: {name?: string,
    price?: number,
    image?: string,
    id?: string,
    isBlock?: boolean,}[];

  constructor () {
    this.products = [];
    this.generateData();
  }

  generateData () {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        id: faker.datatype.uuid(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async find () {
    return this.products;
  }

  async findOne (id: GetProductDto) {
    const product = this.products.find((product) => id === product.id);

    if (!product) throw boom.notFound('Product not found');

    if (product.isBlock) throw boom.conflict('Product is block')

    return product;
  }

  async create (payload: CreateProductDto) {
    const newProduct = {
      ...payload,
      id: faker.datatype.uuid(),
    };
    this.products.push(newProduct);
  }

  async update (id: GetProductDto, payload: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw boom.notFound('Product not found');

    this.products[index] = {
      ...this.products[index],
      ...payload
    };

    return this.products[index];
  }

  async delete (id: GetProductDto) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw boom.notFound('Product not found');

    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductsService;
