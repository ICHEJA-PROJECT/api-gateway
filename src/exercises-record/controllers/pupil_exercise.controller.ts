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
import { CreatePupilExerciseDto } from '../data/dtos/create-pupil-exercise.dto';
import { RECORD_SERVICE_OPTIONS } from '../domain/constants/record_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('pupil-exercises')
export class PupilExerciseController {
  constructor(
    @Inject(RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPupilExerciseDto: CreatePupilExerciseDto) {
    return await this.client
      .send(
        { cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_CREATE },
        createPupilExerciseDto,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('pupils/:id/ids')
  @HttpCode(HttpStatus.OK)
  async findByPupilOnlyIds(@Param('id', ParseIntPipe) id: number) {
    return await this.client
      .send(
        { cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPILS_IDS },
        id,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('pupils/:id')
  @HttpCode(HttpStatus.OK)
  async findByPupil(@Param('id', ParseIntPipe) id: number) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPIL }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('exercises/:id')
  @HttpCode(HttpStatus.OK)
  async findByExercise(@Param('id', ParseIntPipe) id: number) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_EXERCISE }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
