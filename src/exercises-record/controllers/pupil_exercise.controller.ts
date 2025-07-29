import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePupilExerciseDto } from '../data/dtos/create-pupil-exercise.dto';
import { RECORD_SERVICE_OPTIONS } from '../domain/constants/record_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { UpdatePupilExerciseDto } from '../data/dtos/update-pupil-exercise.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pupil-exercises')
export class PupilExerciseController {
  constructor(
    @Inject(RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Record an exercise for a student.",
    description: "Record an exercise completed by a student."
  })
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

  @Get('pupils/:id/exercises/assigned')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "The list of exercises assigned to the student is obtained.",
    description: "The list of exercises assigned to the student by the teacher is obtained."
  })
  async findUncompletedExercisesByPupil(@Param('id') id: number) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_ASSIGNED_EXERCISES_BY_PUPIL }, id)
      .pipe(
        catchError(err => {
          throw new RpcException(err);
        })
      )
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

  @Patch(':id')
  @ApiOperation({
    summary: "Updates the exercise assigned to the student by the teacher.",
    description: "Updates the exercise assigned to the student by the teacher using the relationship ID."
  })
  async updateExerciseToCompleted(@Param('id') id: number, @Body() updatePupilExerciseDto: UpdatePupilExerciseDto) {
    return await this.client
      .send(
        { cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_UPDATE_EXERCISE_TO_COMPLETED }, 
        { id, updatePupilExerciseDto }
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      )
  }
}
