import { MESSAGES } from '@app/shared';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class LoggingServiceController {
  @EventPattern(MESSAGES.LOG_EVENT)
  handleLog(
    @Payload() data: { action: string; payload: any; timestamp: Date },
  ) {
    console.log(`[LOG] ${data.action}`, data.payload);
  }
}
