import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '@/libs/repositories';
import { PayloadProps } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private users: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const auth = req.headers.authorization;
          if (auth?.startsWith('Bearer ')) return auth.slice(7);
          return req.cookies?.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'), // 👈 must match .env key
    });
  }

  async validate(payload: PayloadProps) {
    const user = await this.users.findByEmail(payload.email);

    if (!user) throw new UnauthorizedException('User not found');
    return { sub: user._id, email: user.email, role: user.role };
  }
}
