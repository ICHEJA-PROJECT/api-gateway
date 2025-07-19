import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSkillDto } from '../data/dtos/create-skill.dto';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('skills')
export class SkillController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_SKILL_CREATE },
        createSkillDto,
      )
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
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_SKILL_FIND_ALL }, {})
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('/templates')
  @HttpCode(HttpStatus.OK)
  async getByTemplates(@Query('skills') skills: string) {
    let parsedSkills: number[];
    parsedSkills = skills.split(',').map((skill) => parseInt(skill.trim()));
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_SKILL_FIND_BY_TEMPLATES_ID },
        parsedSkills,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
