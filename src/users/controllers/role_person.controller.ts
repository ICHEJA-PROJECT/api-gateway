import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";

import { ApiOperation } from "@nestjs/swagger";
import { USER_SERVICE_OPTIONS } from "../domain/constants/user_service_options";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateRolePersonDto } from "../data/dtos/create-role-person.dto";
import { catchError } from "rxjs";

@Controller('rolePerson')
export class RolePersonController {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation ({
        summary: "Create a role person.",
        description: "Create a role person."
    })
    async create(@Body() createRolePersonDto: CreateRolePersonDto) {
        return await this.client
            .send(
                { cmd: USER_SERVICE_OPTIONS.ROLE_PERSON_CREATE },
                createRolePersonDto
            )
            .pipe(catchError(error => {
                throw new RpcException(error);
            }))
    }
}