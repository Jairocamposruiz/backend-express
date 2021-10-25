import Joi from 'joi';


const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(2);


export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
});

export const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

export const getUserSchema = Joi.object({
  id: id.required(),
});


export type CreateUserDto = {
  email: string,
  password: string,
  role?: string,
}

export type UpdateUserDto = Partial<CreateUserDto>;

export type GetUserDto = number;
