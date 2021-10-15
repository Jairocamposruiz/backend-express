import * as Joi from 'joi';


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

export const createCategoryDto = Joi.object({
  name: name.required(),
  image: image.required(),
});

export const updateCategoryDto = Joi.object({
  name: name,
  image: image,
});

export const getCategoryDto = Joi.object({
  id: id,
});


export type CreateCategoryDto = {
  name: string,
  image: string,
}

export type UpdateCategoryDto = {
  name?: string,
  image?: string,
}

export type GetCategoryDto = {
  id: string
}
