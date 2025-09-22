import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Admin, AdminSchema } from '@/libs/schemas';
import { AdminsRepository } from '@/libs/repositories';

import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '14d' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminAuthController],
  providers: [AdminsRepository, AdminAuthService, AdminJwtStrategy],
  exports: [AdminsRepository, AdminAuthService],
})
export class AdminAuthModule {}
