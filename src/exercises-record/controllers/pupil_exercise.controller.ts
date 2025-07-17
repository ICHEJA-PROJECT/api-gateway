import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePupilExerciseDto } from '../data/dtos/create-pupil-exercise.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from '../domain/constants/record_service_options';
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

  @Get('pupil-only-ids/:id')
  @HttpCode(HttpStatus.OK)
  async findByPupilOnlyIds(@Param('id') id: number) {
    return await this.client
      .send(
        { cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPIL_ONLY_IDS },
        id,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('pupil/:id')
  @HttpCode(HttpStatus.OK)
  async findByPupil(@Param('id') id: number) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPIL }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('exercise/:id')
  @HttpCode(HttpStatus.OK)
  async findByExercise(@Param('id') id: number) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_EXERCISE }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
