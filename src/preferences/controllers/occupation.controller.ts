import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { PREFERENCES_SERVICE_OPTIONS } from "../domain/constants/preferences_service_options";
import { CreateOccupationDto } from "../data/dtos/create-occupation.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('occupations')
export class OccupationController {
    constructor(
        @Inject(PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME)
        private readonly client: ClientProxy
    ) {}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: "Create a occupation.",
        description: "Create a occupation."
    })
    async create(@Body()createOccupationDto: CreateOccupationDto) {
        return await this.client
            .send(
                { cmd: PREFERENCES_SERVICE_OPTIONS.OCCUPATION_CREATE }, 
                createOccupationDto
            )
            .pipe(catchError(error =>{
                throw new RpcException(error);
            }))
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Get occupations.",
        description: "Get occupations."
    })
    async findAll() {
        return await this.client
            .send(
                { cmd: PREFERENCES_SERVICE_OPTIONS.OCCUPATION_FIND_ALL }, 
                {}
            )
            .pipe(catchError(error =>{
                throw new RpcException(error);
            }))
    }
    
}
