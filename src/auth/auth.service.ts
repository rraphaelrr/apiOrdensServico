import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: any) {
    const payload = { username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}