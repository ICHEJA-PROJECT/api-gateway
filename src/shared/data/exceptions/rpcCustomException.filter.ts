import { Catch, ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcCustomExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: Response = context.getResponse();
    const request = context.getRequest<Request>();
    const rpcError = exception.getError();

    let status = 500;
    let message = 'An unexpected RPC error occurred.';
    let code = 'RPC_ERROR';
    let details: any;

    // Handle empty response case
    if (rpcError.toString().includes('Empty response')) {
      status = 500;
      message = 'Microservice unavailable or returned empty response';
      code = 'MICROSERVICE_UNAVAILABLE';

      this.logger.error(
        `[${request.method} ${request.url}] - RPC Empty Response - Status: ${status}`,
        exception.stack,
      );

      return response.status(status).json({
        statusCode: status,
        message,
        code,
        details: rpcError.toString(),
      });
    }

    // Handle structured RPC error response
    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      status = rpcError.status ? parseInt(String(rpcError.status)) : 400;
      message = rpcError.message as string;
      code = (rpcError as any).code || 'RPC_ERROR';
      details = (rpcError as any).details;

      this.logger.error(
        `[${request.method} ${request.url}] - RPC Structured Error - Status: ${status} - Error: ${message}`,
        exception.stack,
      );

      return response.status(status).json({
        statusCode: status,
        message,
        code,
        details,
      });
    }

    // Handle generic RPC error
    status = 400;
    message =
      typeof rpcError === 'string'
        ? rpcError
        : 'Invalid request to microservice';
    code = 'RPC_BAD_REQUEST';

    this.logger.error(
      `[${request.method} ${request.url}] - RPC Generic Error - Status: ${status} - Error: ${message}`,
      exception.stack,
    );

    return response.status(status).json({
      statusCode: status,
      message,
      code,
      details: typeof rpcError === 'object' ? rpcError : undefined,
    });
  }
}
