import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Query } from "@nestjs/common";
import { ClientProxy, MessagePattern, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { CreateStudentDto } from "../data/dtos/create-student.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('students')
export class StudentController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @ApiOperation ({
        summary: "Create a student.",
        description: "Create a student."
    })
    @MessagePattern({ cmd: USER_SERVICE_OPTIONS.STUDENT_CREATE })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createStudentDto: CreateStudentDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.STUDENT_CREATE },
                createStudentDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }));
    }

    @ApiOperation ({
        summary: "Get students by teacher.",
        description: "Get students by teacher."
    })
    @Get('teachers/:id')
    @HttpCode(HttpStatus.OK)
    async findByTeacher(@Param('id') teacherId: number) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_BY_TEACHER },
                teacherId
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }));
    }

    @ApiOperation ({
        summary: "Get students by curp.",
        description: "Get students by curp."
    })
    @Get('curps')
    @HttpCode(HttpStatus.OK)
    async findByCurp(@Query('curp') curp: string) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_BY_CURP },
                curp
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }));
    }

    @ApiOperation ({
        summary: "Get students by name.",
        description: "Get students by firstname and lastname."
    })
    @Get('names')
    @HttpCode(HttpStatus.OK)
    async findByName(@Query('name') name: string) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_BY_NAME },
                name
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }));
    }

}