import { plainToInstance } from 'class-transformer';
import { IsBooleanString, IsEmail, IsNotEmpty } from 'class-validator';
import { validateSync } from 'class-validator';

export class SeederConfig {
  @IsBooleanString()
  SEED_ADMIN!: string;

  @IsEmail()
  SEED_ADMIN_EMAIL!: string;

  @IsNotEmpty()
  SEED_ADMIN_PASSWORD!: string;

  @IsBooleanString()
  SEED_CITIES!: string;

  @IsBooleanString()
  SEED_TAGS!: string;
}

export function validateSeederConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(SeederConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `❌ Invalid seeder configuration:\n${errors
        .map((e) => JSON.stringify(e.constraints))
        .join('\n')}`,
    );
  }

  return validatedConfig;
}
