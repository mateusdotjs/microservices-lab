import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @MessagePattern()
  create(@Payload() dto: any) {
    return this.userServiceService.create(dto);
  }

  @MessagePattern()
  findAll() {
    return this.userServiceService.findAll();
  }

  @MessagePattern()
  findOne(@Payload() id: number) {
    return this.userServiceService.findOne(id);
  }
}
