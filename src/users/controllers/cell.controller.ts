import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy, MessagePattern, RpcException } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { CreateCellDto } from "../data/dtos/create-cell.dto";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";


@Controller('cells')
export class CellController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}
    
    @ApiOperation ({
        summary: "Create a cell.",
        description: "Create a cell."
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCellDto: CreateCellDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.CELL_CREATE },
                createCellDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @ApiOperation ({
        summary: "Get all cells.",
        description: "Get all cells."
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.CELL_FIND_ALL },
                {}
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @ApiOperation ({
        summary: "Get cells by institution.",
        description: "Get cells by institution."
    })
    @Get('institutions/:id')
    @HttpCode(HttpStatus.OK)
    async findByInstitution(@Param('id') instutionId: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.CELL_FIND_BY_INSTITUTION },
                instutionId
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @ApiOperation ({
        summary: "Get cells by coordinator.",
        description: "Get cells by coordinator."
    })
    @Get('coordinator/:id')
    @HttpCode(HttpStatus.OK)
    async findByCoordinator(@Param('id') coordinatorId: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.CELL_FIND_BY_COORDINATOR },
                coordinatorId
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @ApiOperation ({
        summary: "Get a cell.",
        description: "Get a cell."
    })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.CELL_FIND_ONE },
                id
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}