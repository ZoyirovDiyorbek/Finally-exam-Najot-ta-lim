import { Injectable } from '@nestjs/common';
import { IToken } from './interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { config } from 'src/config';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) { }

  async accessToken(payload: IToken): Promise<string> {
    const expiresIn =
      typeof config.TOKEN.ACCESS_TOKEN_TIME === 'string'
        ? config.TOKEN.ACCESS_TOKEN_TIME
        : config.TOKEN.ACCESS_TOKEN_TIME * 24 * 60 * 60;
    return this.jwt.signAsync(payload, {
      secret: config.TOKEN.ACCESS_TOKEN_KEY,
      expiresIn: expiresIn as any,
    });
  }

  async refreshToken(payload: IToken): Promise<string> {
    const expiresIn =
      typeof config.TOKEN.REFRESH_TOKEN_TIME === 'string'
        ? config.TOKEN.REFRESH_TOKEN_TIME
        : config.TOKEN.REFRESH_TOKEN_TIME * 24 * 60 * 60;
    return this.jwt.signAsync(payload, {
      secret: config.TOKEN.REFRESH_TOKEN_KEY,
      expiresIn: expiresIn as any,
    });
  }

  async writeCookie(res: Response, key: string, value: string, time: number) {
    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: time * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  async verifyToken(token: string, secretKey: string): Promise<object> {
    return this.jwt.verifyAsync(token, { secret: secretKey });
  }
}
