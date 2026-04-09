import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    let message = 'Erro interno';

    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        message = (res as any).message || message;
      } else {
        message = res;
      }
    } else if (exception?.message) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception?.name || 'Error',
      timestamp: new Date().toISOString(),
    });
  }
}