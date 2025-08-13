import { Controller, Get, HttpCode, HttpStatus, Inject, Param, Query } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";


@Controller('settlements')
export class SettlementController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @Get('zipcodes/:zipcode')
    @HttpCode(HttpStatus.OK)
    @ApiOperation ({
        summary: "Get settlements by zipcode.",
        description: "Get settlements by zipcode, initial query."
    })
    async findByZipcode(@Param('zipcode') zipcode: string ){
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.SETTLEMENT_FIND_BY_ZIPCODE },
                zipcode
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @Get('municipalities/:id/towns')
    @HttpCode(HttpStatus.OK)
    @ApiOperation ({
        summary: "Get settlements by municipality and town.",
        description: "Get settlements by municipality and town."
    })
    async findByMunicipalityAndTown(@Param('id') municipalityId: number, @Query('townId') townId: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.SETTLEMENT_FIND_BY_MUNICIPALITY_AND_TOWN },
                { municipalityId, townId }
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}