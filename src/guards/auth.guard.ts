import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as express from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from '../authentication/dto/jwt-payload.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: express.Request = context.switchToHttp().getRequest();

    const token: string = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('로그인 되어있지 않습니다.');
    }

    let payload: JwtPayloadDto;

    try {
      payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return true;
  }

  private extractTokenFromHeader(request: express.Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
