import Joi from 'joi';


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

export const createUserDto = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

export const updeateUserDto = Joi.object({
  name: name,
  email: email,
  password: password,
  role: role,
});

export const getUserDto = Joi.object({
  id: id.required(),
});


export type CreateUserDto = {
  name: string,
  email: string,
  password: string,
  role: string,
}

export type UpdateUserDto = {
  name?: string,
  email?: string,
  password?: string,
  role?: string,
}

export type GetUserDto = {
  id: string,
}
