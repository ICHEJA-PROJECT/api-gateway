import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePupilSkillDto } from '../data/dtos/create-pupil-skill.dto';
import { RECORD_SERVICE_OPTIONS } from '../domain/constants/record_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiQuery } from '@nestjs/swagger';

@Controller('pupil-skills')
export class PupilSkillController {
  constructor(
    @Inject(RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPupilSkillDto: CreatePupilSkillDto) {
    return await this.client
      .send(
        { cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_CREATE },
        createPupilSkillDto,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post('many')
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() createMany: { pupilSkills: [CreatePupilSkillDto] }) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_CREATE_MANY }, createMany)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_ALL }, {})
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('pupil/:id')
  @HttpCode(HttpStatus.OK)
  async getByPupil(@Param('id') id: number) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_BY_PUPIL }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @ApiQuery({
    name: 'pupilId',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'skills',
    required: true,
    type: String,
  })
  @Get('grades/skills')
  @HttpCode(HttpStatus.OK)
  async getGradeBySkills(
    @Query('pupilId') pupilId: string,
    @Query('skills') skills: string,
  ) {
    return await this.client
      .send(
        { cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_GET_GRADES_BY_SKILLS },
        {
          pupilId,
          skills,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
