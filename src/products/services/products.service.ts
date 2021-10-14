import boom from '@hapi/boom';
const faker = require('faker');


type Product = {
  name?: string,
  price?: number,
  image?: string,
  id: string,
  isBlock: boolean,
}

class ProductsService {
  products: Product[];

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

  async findOne (id: string) {
    const product = this.products.find((product) => id === product.id);

    if (!product) throw boom.notFound('Product not found');

    if (product.isBlock) throw boom.conflict('Product is block')

    return product;
  }

  async create (payload: { name: string, price: number, image: string, isBlock: boolean }) {
    const newProduct = {
      ...payload,
      id: faker.datatype.uuid(),
    };
    this.products.push(newProduct);
  }

  async update (id: string, payload: { name?: string, price?: number, image?: string, isBlock?: boolean }) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw boom.notFound('Product not found');

    this.products[index] = {
      ...this.products[index],
      ...payload
    };

    return this.products[index];
  }

  async delete (id: string) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw boom.notFound('Product not found');

    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductsService;
