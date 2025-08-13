import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { CreateRoleDto } from "../data/dtos/create-role.dto";
import { catchError } from "rxjs";
import { ApiOperation } from "@nestjs/swagger";



@Controller('roles')
export class RoleController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation ({
        summary: "Create a role.",
        description: "Create a role."
    })
    async create(@Body() createRoleDto: CreateRoleDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.ROLE_CREATE },
                createRoleDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation ({
        summary: "Get roles.",
        description: "Get all roles."
    })
    async findAll() {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.ROLE_FIND_ALL },
                {}
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}