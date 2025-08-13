import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";

@Controller('municipalities')
export class MunipalicityController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @Get('states/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation ({
        summary: "Get municipalities by state.",
        description: "Get municipalities by state."
    })
    async findByState(@Param('id') stateId: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.MUNICIPALITY_FIND_BY_STATE },
                stateId
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}