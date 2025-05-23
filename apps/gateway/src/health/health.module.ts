import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule],
  controllers: [],
  providers: [HealthService],
})
export class HealthModule {}
