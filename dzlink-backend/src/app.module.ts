import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validateMultipleEnvs } from './config/validate-env';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtEnvConfig, MongoEnvConfig } from './config';
import { OffersService } from './offers/offers.service';
import { OffersController } from './offers/offers.controller';
import { OffersModule } from './offers/offers.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { SponsorshipService } from './sponsorship/sponsorship.service';
import { SponsorshipController } from './sponsorship/sponsorship.controller';
import { SponsorshipModule } from './sponsorship/sponsorship.module';
import DatabaseModule from './database/database.module';
import { TagsModule } from './tags/tags.module';
import { CitiesModule } from './cities/cities.module';
import { CityController } from './cities/cities.controller';
import { TagController } from './tags/tags.controller';
import { TagService } from './tags/tags.service';
import { CitesService } from './cities/cities.service';
import { SeederConfig } from './config/seeder-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) =>
        validateMultipleEnvs(
          [JwtEnvConfig, MongoEnvConfig, SeederConfig],
          config,
        ),
    }),
    DatabaseModule,
    UploadModule,
    AuthModule,
    UsersModule,
    OffersModule,
    AdminAuthModule,
    SponsorshipModule,
    TagsModule,
    CitiesModule,
  ],
  controllers: [
    AppController,
    OffersController,
    SponsorshipController,
    CityController,
    TagController,
  ],
  providers: [
    AppService,
    OffersService,
    SponsorshipService,
    TagService,
    CitesService,
  ],
})
export class AppModule {}
