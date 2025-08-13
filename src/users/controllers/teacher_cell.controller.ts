import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { CreateTeacherCellDto } from "../data/dtos/create-teacher-cell.dto";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";

@Controller('teacherCell')
export class TeacherCellController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @ApiOperation ({
        summary: "Add teacher to a cell.",
        description: "Add teacher to a cell."
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTeacherCellDto: CreateTeacherCellDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.TEACHER_CELL_CREATE },
                createTeacherCellDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}