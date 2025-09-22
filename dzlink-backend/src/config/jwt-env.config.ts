import { IsNotEmpty, IsString } from 'class-validator';

export class JwtEnvConfig {
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;
}
