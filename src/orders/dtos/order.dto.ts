import Joi from 'joi';


const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);


export const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

export const updateOrderSchema = Joi.object({
  customerId: customerId,
});

export const getOrderSchema = Joi.object({
  id: id.required(),
});

export const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});


export type CreateOrderDto = {
  customerId: number,
}

export type UpdateOrderDto = Partial<CreateOrderDto>;

export type GetOrderDto = number;

export type AddItemDto = {
  orderId: number,
  productId: number,
  amount: number,
}
