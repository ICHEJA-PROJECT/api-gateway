import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common";
import { ClientProxy, MessagePattern, RpcException } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "../domain/constants/preferences_service_options";
import { catchError } from "rxjs";
import { ApiOperation, ApiProperty } from "@nestjs/swagger";

@Controller('preferences')
export class PreferencesController {
    constructor(
        @Inject(PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME)
        private readonly client: ClientProxy
    ) {}

    @Get('student-impairments/students/:id/details')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Obtain the student's preferences.",
        description: "Obtain the student's disability and learning path."
    })
    async getByStudentWithDetails(@Param('id') studentId: number) {
        return await this.client
            .send(
                { cmd: PREFERENCES_SERVICE_OPTIONS.STUDENT_IMPAIRMENT_FIND_BY_STUDENT_WITH_DETAILS }, 
                {
                    id: studentId
                }
            )
            .pipe(catchError(error =>{
                throw new RpcException(error);
            }))
    }
}