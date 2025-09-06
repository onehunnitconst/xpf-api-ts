import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as os from 'os';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    return call$.handle().pipe(
      tap((val) => {
        this.loggerNext(val, context);
      }),
    );
  }

  loggerNext(val: unknown, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const method = request.method;
    const uri = request.originalUrl;
    const ip = request.ip ?? request.get('X-Forwarded-For');
    const hostname = os.hostname();
    const userAgent = request.get('user-agent') || '';
    const referer = request.get('referer') || '';

    const statusCode = response.statusCode;
    const statusMessage = response.statusMessage;
    const contentLength = response.get('content-length');

    this.logger.log(
      [
        method,
        uri,
        'ip:',
        ip,
        'hostname:',
        hostname,
        'user-agent:',
        userAgent,
        'referer:',
        referer,
      ].join(' '),
    );
    this.logger.log([statusCode, statusMessage, contentLength].join(' '));
  }
}
