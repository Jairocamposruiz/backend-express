import Joi from 'joi';


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const isBlock = Joi.boolean();
const image = Joi.string().uri();

export const createProductDto = Joi.object({
  name: name.required(),
  price: price.required(),
  isBlock: isBlock.required(),
  image: image.required(),
});

export const updateProductDto = Joi.object({
  name: name,
  price: price,
  isBlock: isBlock,
  image: image,
});

export const getProductDto = Joi.object({
  id: id.required(),
});
