import Joi from 'joi';


const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const isBlock = Joi.boolean();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();


export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  isBlock: isBlock.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  isBlock: isBlock,
  image: image,
  categoryId: categoryId,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});


export type CreateProductDto = {
  name: string,
  price: number,
  description: string,
  isBlock: boolean,
  image: string,
  categoryId: number,
}

export type UpdateProductDto = {
  name?: string,
  price?: number,
  description?: string
  isBlock?: boolean,
  image?: string,
  categoryId?: number,
}

export type GetProductDto = number;
