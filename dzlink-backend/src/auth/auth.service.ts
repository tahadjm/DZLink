import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import {
  SignupDto,
  SigninDto,
  UpdatePasswordDto,
  UpdateProfileDto,
} from './dto';
import { UsersRepository } from '@/libs/repositories';
import { PayloadProps } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<void> {
    console.log('signupdto', dto);

    const email = dto.email.toLowerCase();
    const exists = await this.users.findByEmail(email);
    if (exists) throw new ConflictException('Email already in use');

    const passwordHash = await argon2.hash(dto.password);
    await this.users.createUser({
      email,
      password: passwordHash,
      name: dto.name,
      role: dto.role,
    });
  }

  async signin(dto: SigninDto): Promise<{
    token: string;
  }> {
    const user = await this.users.findByEmail(dto.email, true);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!(await argon2.verify(user.password, dto.password)))
      throw new UnauthorizedException('Invalid credentials');

    const token = this._signJwt({
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
    };
  }

  async updatePassword(email: string, dto: UpdatePasswordDto): Promise<void> {
    const user = await this.users.findByEmail(email, true);
    if (!user) throw new NotFoundException('User not found');
    if (!(await argon2.verify(user.password, dto.oldPassword)))
      throw new UnauthorizedException('Incorrect old password');

    await this.users.updatePassword(email, dto.newPassword);
  }

  async updateProfile(dto: UpdateProfileDto, userId: string) {
    const updateData: any = { ...dto };

    return this.users.update(userId, updateData);
  }

  private _signJwt(payload: PayloadProps): string {
    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '14d',
    });
  }
}
