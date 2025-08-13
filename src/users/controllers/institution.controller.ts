import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { CreateInstitutionDto } from "../data/dtos/create-institution.dto";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";

@Controller('institutions')
export class InstitutionController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @ApiOperation ({
        summary: "Create a institution.",
        description: "Create a institution."
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createInstitutionDto: CreateInstitutionDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.INSTITUTION_CREATE },
                createInstitutionDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @ApiOperation ({
        summary: "Get all institutions.",
        description: "Get all instituions."
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.INSTITUTION_FIND_ALL },
                {}
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @ApiOperation ({
        summary: "Get a institution.",
        description: "Get a institution."
    })
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.INSTITUTION_FIND_BY_ID },
                id
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}