import 'dotenv/config';
import { EnvsI } from './domain/interfaces/EnvsI';
import { envsValidator } from './validators/envs.validator';

const getEnvs = (): EnvsI => {
  const { error, value } = envsValidator.validate({
    ...process.env,
    BROKER_HOSTS: process.env.BROKER_HOSTS?.split(','),
  });

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    PORT: value.PORT,
    BROKER_HOSTS: value.BROKER_HOSTS,
  };
};

export const envsValues = getEnvs();
