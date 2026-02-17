import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException, HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Se é erro de validação do Nest (ValidationPipe)
    if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      const { message } = exceptionResponse as any;
      
      // Se message é um array, pega o primeiro erro
      const errorMessage = Array.isArray(message) ? message[0] : message;

      response.status(status).json({
        statusCode: status,
        message: errorMessage,
        error: (exceptionResponse as any).error || 'Error',
      });
    } else {
      response.status(status).json(exceptionResponse);
    }
  }
}
