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
import { CreateTemplateDto } from '../data/dtos/create-template.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { catchError } from 'rxjs';

@Controller('templates')
export class TemplateController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_CREATE },
        createTemplateDto,
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
        {
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_ALL,
        },
        {},
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('topics')
  @HttpCode(HttpStatus.OK)
  async getByTopics(@Query('topics') topics: string) {
    let parsedTopics: number[];
    parsedTopics = topics.split(',').map((topic) => parseInt(topic.trim()));
    return await this.client
      .send(
        {
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_BY_TOPICS_ID,
        },
        parsedTopics,
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('/topic/:id')
  @HttpCode(HttpStatus.OK)
  async getByTopic(@Param('id') id: number) {
    return await this.client
      .send(
        {
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_BY_TOPIC_ID,
        },
        id,
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: number) {
    return await this.client
      .send(
        {
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_BY_ID,
        },
        id,
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
