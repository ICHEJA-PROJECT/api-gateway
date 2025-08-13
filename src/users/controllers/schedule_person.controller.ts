import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { CreateSchedulePersonDto } from "../data/dtos/create-schedule-person.dto";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { ApiOperation } from "@nestjs/swagger";


@Controller('schedules-person')
export class SchedulePersonController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @ApiOperation ({
        summary: "Create add schedule to person.",
        description: "Create add schedule to person."
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createSchedulePersonDto: CreateSchedulePersonDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.SCHEDULE_PERSON_CREATE },
                createSchedulePersonDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }));
    }

    @ApiOperation ({
        summary: "Get schedules by person.",
        description: "Get schedules by person."
    })
    @Get('persons/:id')
    @HttpCode(HttpStatus.OK)
    async getByPerson(@Param('id') id: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.SCHEDULE_PERSON_FIND_BY_PERSON },
                id
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }));
    }
}