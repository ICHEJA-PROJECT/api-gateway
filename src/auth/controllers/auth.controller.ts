import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Inject,
} from '@nestjs/common';
import { CreateStudentDto } from '../data/dtos/create-student.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterStudentResponseAdapter } from '../data/adapters/register-student.adapter';
import { LoginStudentResponseAdapter } from '../data/adapters/login-student.adapter';
import { GetAllStudentsQueryDto } from '../data/dtos/get-all-students.dto';
import { StudentResponseAdapter } from '../data/adapters/student.adapter';
import { LoginStudentDto } from '../data/dtos/login-student-dto';
import { createSuccessResponseDto } from 'src/shared/data/dtos/success-response.dto';
import { ErrorResponseDto } from 'src/shared/data/dtos/error-response.dto';
import { AUTH_SERVICE_OPTIONS } from '../domain/constants/auth_service_options';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

const RegisterStudentSuccess = createSuccessResponseDto(
  RegisterStudentResponseAdapter,
);
const LoginStudentSuccess = createSuccessResponseDto(
  LoginStudentResponseAdapter,
);

const StudentSuccess = createSuccessResponseDto(StudentResponseAdapter);

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_OPTIONS.AUTH_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post('register-student')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The student has been successfully created.',
    type: RegisterStudentSuccess,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Input data validation failed.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: ErrorResponseDto,
  })
  async registerStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.client
      .send(
        { cmd: AUTH_SERVICE_OPTIONS.AUTH_REGISTER_STUDENT },
        createStudentDto,
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post('login-student')
  @ApiOkResponse({
    description: 'Student logged in successfully.',
    type: LoginStudentSuccess,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid Token.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: ErrorResponseDto,
  })
  async loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    return await this.client
      .send({ cmd: AUTH_SERVICE_OPTIONS.AUTH_LOGIN_STUDENT }, loginStudentDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('students')
  @ApiOkResponse({
    description: 'Students fetched successfully.',
    type: [StudentSuccess],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 204,
    description: 'No content',
    type: ErrorResponseDto,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'educator_id',
    type: Number,
    required: false,
  })
  async getAllStudents(@Query() query: GetAllStudentsQueryDto) {
    return await this.client
      .send({ cmd: AUTH_SERVICE_OPTIONS.AUTH_GET_ALL_STUDENTS }, query)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
