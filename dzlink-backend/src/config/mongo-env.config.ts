import { IsString, IsNumberString } from 'class-validator';

export class MongoEnvConfig {
  @IsString()
  MONGO_INITDB_DATABASE: string;

  @IsString()
  MONGO_HOST: string;

  @IsNumberString()
  MONGO_PORT: string;
}
