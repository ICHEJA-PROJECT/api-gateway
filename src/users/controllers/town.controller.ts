import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";

@Controller('towns')
export class TownController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @Get('municipalities/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation ({
        summary: "Get towns by municipality.",
        description: "Get town by municipality."
    })
    async findByMunicipality(@Param('id') municipalityId: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.TOWN_FIND_BY_MUNICIPALITY },
                municipalityId
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}