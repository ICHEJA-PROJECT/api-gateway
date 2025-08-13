import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateScheduleDto } from "../data/dtos/create-schedule.dto";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";

@Controller('schedules')
export class ScheduleController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @ApiOperation ({
        summary: "Create a schedule.",
        description: "Create a schedule."
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createScheduleDto: CreateScheduleDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.SCHEDULE_CREATE },
                createScheduleDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @ApiOperation ({
        summary: "Get schedules.",
        description: "Get schedules."
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.SCHEDULE_FIND_ALL },
                {}
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}