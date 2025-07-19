import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { CreateTypeInstructionMediaDto } from '../data/dtos/create-type-instruction-media.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { catchError } from 'rxjs';

@Controller('instructions-medias-types')
export class TypeInstructionMediaController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTypeInstructionMediaDto: CreateTypeInstructionMediaDto,
  ) {
    return await this.client
      .send(
        {
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_INSTRUCTION_MEDIA_CREATE,
        },
        createTypeInstructionMediaDto,
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
      .send(
        {
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_INSTRUCTION_MEDIA_FIND_ALL,
        },
        {},
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
