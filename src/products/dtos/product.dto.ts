import Joi from 'joi';


const id = Joi.number();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const isBlock = Joi.boolean();
const image = Joi.string().uri();


export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  isBlock: isBlock.required(),
  image: image.required(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
  isBlock: isBlock,
  image: image,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});


export type CreateProductDto = {
  name: string,
  price: number,
  isBlock: boolean,
  image: string,
}

export type UpdateProductDto = {
  name?: string,
  price?: number,
  isBlock?: boolean,
  image?: string,
}

export type GetProductDto = number;
