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
  Query,
} from '@nestjs/common';
import { CreateTopicDto } from '../data/dtos/create-topic.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { catchError } from 'rxjs';
import { ApiOperation } from '@nestjs/swagger';

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

  @Get('pupils/:id/learning-path')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
        summary: "Obtain the student's feasible topics.",
        description:
          "Obtain the list of topics the student is allowed to study.",
  })
  async getTopicsByPupil(@Param('id', ParseIntPipe) id: number, @Query('learningPathId') learningPathId: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_BY_PUPIL }, { id, learningPathId })
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

  @Get('/:id/learning-path')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
        summary: "A topic is retrieved by its ID and the student's learning path.",
        description:
          "A topic is retrieved, along with the list of questions.",
  })
  async getTopic(@Param('id', ParseIntPipe) id: number, @Query('learningPathId') learningPathId: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_BY_ID }, { id, learningPathId})
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
