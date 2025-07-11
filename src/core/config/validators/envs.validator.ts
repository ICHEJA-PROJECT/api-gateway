import * as Joi from 'joi';
import { EnvsI } from '../domain/interfaces/EnvsI';

export const envsValidator = Joi.object<EnvsI>({
  PORT: Joi.number().required(),
  BROKER_HOSTS: Joi.array().items(Joi.string()).required(),
}).unknown(true);
