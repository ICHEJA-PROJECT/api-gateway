import { Controller, Get, HttpCode, HttpStatus, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { ApiOperation } from "@nestjs/swagger";
import { catchError } from "rxjs";

@Controller('road-types')
export class RoadTypeController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation ({
        summary: "Get road types.",
        description: "Get types of roads."
    })
    async findAll() {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.ROAD_TYPE_FIND_ALL },
                {}
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}