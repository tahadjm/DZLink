import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AdminsRepository } from '@/libs/repositories';
import { AdminSigninDto } from './dto/admin-signin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminsRepo: AdminsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(dto: AdminSigninDto) {
    const admin = await this.adminsRepo.findByEmail(dto.email);
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isValid = await argon2.verify(admin.password_hash, dto.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: admin._id, email: admin.email, type: 'admin' };

    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
