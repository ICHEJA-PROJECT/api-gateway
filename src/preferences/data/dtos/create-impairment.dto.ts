import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateImpairmentDto {
    @ApiProperty({description: "Name of impairment", type: "string", maxLength: 32})
    @IsString()
    name: string;
}