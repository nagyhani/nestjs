
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { error } from 'console';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const stack = exception.stack
    const message = exception.message
     const exceptionResponse = exception.getResponse() as any

    response
      .status(status)
      .json({
        statusCode: status,
        message: exceptionResponse.message,
      errors: exceptionResponse.errors ?? null,
       status:false,
       stack,
       
       
      });
  }
}
