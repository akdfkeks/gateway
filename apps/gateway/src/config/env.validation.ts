import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  APP_PORT: number;

  @IsNotEmpty()
  @IsString()
  AUTH_SERVICE_HOST: string;

  @IsNumber()
  AUTH_SERVICE_PORT: number;

  @IsNotEmpty()
  @IsString()
  EVENT_SERVICE_HOST: string;

  @IsNumber()
  EVENT_SERVICE_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
