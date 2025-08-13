import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreatePersonDto } from "../data/dtos/create-person.dto";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { ApiOperation } from "@nestjs/swagger";
import { catchError } from "rxjs";

@Controller('persons')
export class PersonController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation ({
        summary: "Create a person.",
        description: "Create a person with location information."
    })
    async create(@Body() createPersonDto: CreatePersonDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.PERSON_CREATE },
                createPersonDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation ({
        summary: "Get person by id.",
        description: "Get person by id."
    })
    async findOne(@Param('id') id: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.PERSON_FIND_ONE },
                id
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

}