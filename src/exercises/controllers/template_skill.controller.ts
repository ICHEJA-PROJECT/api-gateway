import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateTemplateSkillDto } from '../data/dtos/create-template-skill.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';

@Controller('templates-skills')
export class TemplateSkillController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTemplateSkillDto: CreateTemplateSkillDto) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_SKILL_CREATE },
        createTemplateSkillDto,
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_SKILL_FIND_ALL },
        {},
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
