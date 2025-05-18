import { Injectable, Logger } from '@nestjs/common';
import { HealthCheckService, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

interface MicroService {
  name: string;
  transport: Transport;
  host: string;
  port: number;
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private readonly microServices: MicroService[];

  constructor(
    private readonly configService: ConfigService,
    private readonly healthCheckService: HealthCheckService,
    private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
  ) {
    this.microServices = [
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        host: this.configService.getOrThrow('AUTH_SERVICE_HOST'),
        port: this.configService.getOrThrow('AUTH_SERVICE_PORT'),
      },
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        host: this.configService.getOrThrow('EVENT_SERVICE_HOST'),
        port: this.configService.getOrThrow('EVENT_SERVICE_PORT'),
      },
    ];
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async check() {
    this.logger.log('Checking microservices status...');

    const checkers = this.microServices.map((service) => {
      return async () =>
        this.microserviceHealthIndicator.pingCheck(service.name, {
          transport: service.transport,
          timeout: 3000,
          options: {
            host: service.host,
            port: service.port,
          },
        });
    });

    await this.healthCheckService.check(checkers);
  }
}
