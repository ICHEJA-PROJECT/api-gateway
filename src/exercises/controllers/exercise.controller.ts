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
import { CreateExerciseDto } from '../data/dtos/create-exercise.dto';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiOperation } from '@nestjs/swagger';

@Controller('exercises')
export class ExerciseController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_CREATE },
        createExerciseDto,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_ALL }, {})
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('/porcentage')
  @HttpCode(HttpStatus.OK)
  async getPorcentageByIdAndSkill(
    @Query('id', ParseIntPipe) id: number,
    @Query('skillId', ParseIntPipe) skillId: number,
  ) {
    return await this.client
      .send(
        { cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_PERCENTAGE },
        { id, skillId },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('pupil/:id/learning-path')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "The student's proposed exercises will be obtained.",
    description: "The student's proposed exercises are obtained based on the genetic algorithm."
  })
  async findByPupil(@Param('id', ParseIntPipe) id: number, @Query('learningPathId') learningPathId: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_BY_PUPIL_ID }, { id, learningPathId })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "A specific exercise is obtained.",
    description: "An exercise is obtained by its ID."
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_BY_ID }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('templates/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "An exercise is obtained by the reactive.",
    description: "A random exercise is obtained by searching for the reactive ID."
  })
  async findRandomByTemplate(@Param('id') id: number) {
    return await this.client
      .send({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RANDOM_FIND_BY_TEMPLATE}, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        })
      )
  }

}
