import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AdminsRepository } from '@/libs/repositories/';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly adminsRepo: AdminsRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const admin = await this.adminsRepo.findById(payload.sub);
    if (!admin) {
      throw new UnauthorizedException('Invalid admin token');
    }
    return admin;
  }
}
