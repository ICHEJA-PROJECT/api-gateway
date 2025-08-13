import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { envsValues } from "src/core/config/getEnvs";
import { USER_SERVICE_OPTIONS } from "src/users/domain/constants/user_service_options";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: USER_SERVICE_OPTIONS.USER_SERVICE_NAME,
                transport: Transport.RMQ,
                options: {
                    urls: envsValues.BROKER_HOSTS,
                    queue: USER_SERVICE_OPTIONS.USER_QUEUE,
                    queueOptions: {
                        durable: true
                    }
                }
            }
        ])
    ],
    exports: [
        ClientsModule.register([
            {
                name: USER_SERVICE_OPTIONS.USER_SERVICE_NAME,
                transport: Transport.RMQ,
                options: {
                    urls: envsValues.BROKER_HOSTS,
                    queue: USER_SERVICE_OPTIONS.USER_QUEUE,
                    queueOptions: {
                        durable: true
                    }
                }
            }
        ])
    ]
})
export class UsersTransport {}