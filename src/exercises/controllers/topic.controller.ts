import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTopicDto } from '../data/dtos/create-topic.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { catchError } from 'rxjs';

@Controller('topics')
export class TopicController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_ALL }, {})
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('pupils/:id')
  @HttpCode(HttpStatus.OK)
  async getTopicsByPupil(@Param('id', ParseIntPipe) id: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_BY_PUPIL }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTopicDto: CreateTopicDto) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_CREATE },
        createTopicDto,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getTopic(@Param('id', ParseIntPipe) id: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_BY_ID }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
