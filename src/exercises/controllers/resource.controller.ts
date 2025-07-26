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
import { CreateResourceDto } from '../data/dtos/create-resource.dto';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiOperation } from '@nestjs/swagger';

@Controller('resources')
export class ResourceController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_ALL }, {})
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('pupils/:id/learning-path')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
      summary: "Obtain resources based on the student's topics.",
      description:
        "Obtain a list of resources for the student's topics.",
  })
  async getByPupil(@Param('id', ParseIntPipe) id: number, @Query('learningPathId') learningPathId: number) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_BY_PUPIL },
        {
          id, learningPathId
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('topic/:id/learning-path')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Obtain the resources for a topic.",
    description: "Obtain the resources for a topic based on the topic ID and the student's learning path ID."
  })
  async getByTopic(@Param('id', ParseIntPipe) id: number, @Query('learningPathId') learningPathId: number) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_BY_TOPIC },
        {
          id, learningPathId
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
        summary: "A resource is retrieved by ID.",
        description:
          "A resource is retrieved with the information to view it.",
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_BY_ID }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createResourceDto: CreateResourceDto) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_CREATE },
        createResourceDto,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
