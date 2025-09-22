import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateMultipleEnvs(
  configClasses: (new () => object)[],
  config: Record<string, any>,
): Record<string, any> {
  for (const configClass of configClasses) {
    const validated = plainToInstance(configClass, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validated, { skipMissingProperties: false });
    if (errors.length) {
      throw new Error(
        `${configClass.name} validation error: ` +
          errors.map((e) => Object.values(e.constraints).join(', ')).join('; '),
      );
    }
  }
  return config;
}
