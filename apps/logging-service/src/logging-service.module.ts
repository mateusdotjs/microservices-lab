import { Module } from '@nestjs/common';
import { LoggingServiceController } from './logging-service.controller';

@Module({
  imports: [],
  controllers: [LoggingServiceController],
  providers: [],
})
export class LoggingServiceModule {}
