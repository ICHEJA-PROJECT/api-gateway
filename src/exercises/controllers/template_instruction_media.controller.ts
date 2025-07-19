import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTemplateInstructionMediaDto } from '../data/dtos/create-template-instruction-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from '../domain/constants/exercise_service_options';
import { catchError } from 'rxjs';

@Controller('templates-instructions-medias')
export class TemplateInstructionMediaController {
  constructor(
    @Inject(EXERCISE_SERVICE_OPTIONS.EXERCISE_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('pathMedia'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        template: {
          type: 'number',
          description: 'ID of template',
        },
        typeMedia: {
          type: 'number',
          description: 'ID of type media',
        },
        pathMedia: {
          type: 'string',
          format: 'binary',
          description: 'Media file (gif, img, video, etc)',
        },
      },
      required: ['template', 'typeMedia', 'pathMedia'],
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: { template: number; typeMedia: number },
    @UploadedFile() pathMedia: Express.Multer.File,
  ) {
    const createDto: CreateTemplateInstructionMediaDto = {
      pathMedia: pathMedia,
      template: body.template,
      typeMedia: body.typeMedia,
    };

    return await this.client
      .send(
        EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_INSTRUCTION_MEDIA_CREATE,
        createDto,
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.client
      .send(
        EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_INSTRUCTION_MEDIA_FIND_ALL,
        {},
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
