import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { CreateTypeLayoutDto } from '../data/dtos/create-type-layout.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { catchError } from 'rxjs';

@Controller('layouts-types')
export class TypeLayoutController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTypeLayoutDto: CreateTypeLayoutDto) {
    return await this.client
      .send(
        {
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_LAYOUT_CREATE,
        },
        createTypeLayoutDto,
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
          cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_LAYOUT_FIND_ALL,
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
