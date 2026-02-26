import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class LoggingServiceController {
  @EventPattern()
  handleLog(
    @Payload() data: { action: string; payload: any; timestamp: Date },
  ) {
    console.log(`[LOG] ${data.action}`, data.payload);
  }
}
