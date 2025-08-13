import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { CreateImpairmentDto } from "../data/dtos/create-impairment.dto";
import { PREFERENCES_SERVICE_OPTIONS } from "../domain/constants/preferences_service_options";
import { ApiOperation } from "@nestjs/swagger";

@Controller('impairments')
export class ImpairmentController {
    constructor(
        @Inject(PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME)
        private readonly client: ClientProxy
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: "Create impairment.",
        description: "Create an impairment."
    })
    async create(@Body() createImpairmentDto: CreateImpairmentDto) {
        return await this.client
            .send(
                { cmd: PREFERENCES_SERVICE_OPTIONS.IMPAIRMENT_CREATE }, 
                createImpairmentDto
            )
            .pipe(catchError(error =>{
                throw new RpcException(error);
            }))
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Get impairments.",
        description: "Get impairments."
    })
    async getAll() {
        return await this.client
            .send(
                { cmd: PREFERENCES_SERVICE_OPTIONS.IMPAIRMENT_FIND_ALL }, 
                {}
            )
            .pipe(catchError(error =>{
                throw new RpcException(error);
            }))
    }

}