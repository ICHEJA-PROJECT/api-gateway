import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  LoginCredentialsDto,
  LoginQrDto,
  ValidateTokenDto,
} from '../data/dtos';
import {
  LoginResponseAdapter,
  ValidateTokenResponseAdapter,
} from '../data/adapters';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE_OPTIONS } from '../domain/constants/auth_service_options';
import { catchError } from 'rxjs';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_OPTIONS.AUTH_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Post('login/credentials')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login with CURP and password',
    description: 'Authenticate user using CURP and password credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseAdapter,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 404,
    description: 'User role not found',
  })
  async loginWithCredentials(@Body() loginDto: LoginCredentialsDto) {
    return await this.client
      .send({ cmd: AUTH_SERVICE_OPTIONS.AUTH_LOGIN_CREDENTIALS }, loginDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post('login/qr')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login with QR code',
    description: 'Authenticate user using encrypted token from QR code',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseAdapter,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid QR token or user not found',
  })
  async loginWithQR(@Body() loginDto: LoginQrDto) {
    return await this.client
      .send({ cmd: AUTH_SERVICE_OPTIONS.AUTH_LOGIN_STUDENT }, loginDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Validate JWT token',
    description:
      'Validate JWT token and extract payload information, check if expired',
  })
  @ApiResponse({
    status: 200,
    description: 'Token validation result',
    type: ValidateTokenResponseAdapter,
  })
  async validateToken(@Body() validateDto: ValidateTokenDto) {
    return await this.client
      .send({ cmd: AUTH_SERVICE_OPTIONS.AUTH_VALIDATE_TOKEN }, validateDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
