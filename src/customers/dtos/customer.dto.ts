import Joi from 'joi';


const id = Joi.number().integer();
const name = Joi.string().min(2);
const lastName = Joi.string().min(2);
const phone = Joi.string();
const userId = Joi.number().integer();


export const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  userId: userId.required(),
})

export const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
})

export const getCustomerSchema = Joi.object({
  id: id.required(),
})


export type CreateCustomerDto = {
  name: string,
  lastName: string,
  phone?: string,
}

export type UpdateCustomerDto = Partial<CreateCustomerDto>;

export type GetCustomerDto = number;
