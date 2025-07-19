import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateTemplateSkillDto {
    @ApiProperty({ description: "id of template", type: "number"})
    @IsNumber()
    template: number;
    @ApiProperty({ description: "id of skill", type: "number"})
    @IsNumber()
    skill: number;
    @ApiProperty({ description: "porcentage of skill in template", type: "number"})
    @IsNumber()
    porcentage: number;
    @ApiProperty({ description: "flag to skill", type: "boolean", default: true})
    @IsBoolean()
    flag: boolean;
}