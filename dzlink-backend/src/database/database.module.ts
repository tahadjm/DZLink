import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('MONGO_HOST', 'localhost');
        const port = config.get<string>('MONGO_PORT', '27017');
        const db = config.get<string>('MONGO_INITDB_DATABASE', 'dzlink');

        const uri = `mongodb://${host}:${port}/${db}`;

        return { uri };
      },
    }),
  ],
})
export default class DatabaseModule {}
