import Joi from 'joi';


const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const isBlock = Joi.boolean();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();


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

export const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required(),
  }),
})

export type CreateProductDto = {
  name: string,
  price: number,
  description: string,
  isBlock: boolean,
  image: string,
  categoryId: number,
}

export type UpdateProductDto = Partial<CreateProductDto>;

export type GetProductDto = number;

export type QueryProductDto = {
  limit?: number,
  offset?: number,
  price?: number,
  price_min?: number,
  price_max?: number,
}
