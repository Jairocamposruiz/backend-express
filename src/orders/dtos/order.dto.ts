import Joi from 'joi';


const id = Joi.number().integer();
const customerId = Joi.number().integer();


export const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

export const updateOrderSchema = Joi.object({
  customerId: customerId,
});

export const getOrderSchema = Joi.object({
  id: id.required(),
});


export type CreateOrderDto = {
  customerId: number,
}

export type UpdateOrderDto = Partial<CreateOrderDto>;

export type GetOrderDto = number;
