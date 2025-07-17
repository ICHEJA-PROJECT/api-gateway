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
import { CreatePupilTopicDto } from '../data/dtos/create-pupil-topic.dto';
import { RECORD_SERVICE_OPTIONS } from '../domain/constants/record_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('pupil-topics')
export class PupilTopicController {
  constructor(
    @Inject(RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPupilTopicDto: CreatePupilTopicDto) {
    return await this.client
      .send(
        { cmd: RECORD_SERVICE_OPTIONS.PUPIL_TOPIC_CREATE },
        createPupilTopicDto,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getByPupil(@Param('id') id: number) {
    return await this.client
      .send({ cmd: RECORD_SERVICE_OPTIONS.PUPIL_TOPIC_FIND_BY_PUPIL }, id)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
