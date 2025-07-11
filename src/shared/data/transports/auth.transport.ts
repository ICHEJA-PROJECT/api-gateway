import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_OPTIONS } from 'src/auth/domain/constants/auth_service_options';
import { envsValues } from 'src/core/config/getEnvs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_OPTIONS.AUTH_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: AUTH_SERVICE_OPTIONS.AUTH_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_OPTIONS.AUTH_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: AUTH_SERVICE_OPTIONS.AUTH_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
})
export class AuthTransport {}
