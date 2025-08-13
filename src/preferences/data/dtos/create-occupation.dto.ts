import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateOccupationDto {
    @ApiProperty({description: "ocupation's name", type: 'string', maxLength: 32})
    @IsString()
    name: string;
}