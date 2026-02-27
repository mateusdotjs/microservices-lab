import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, MESSAGES } from '@app/shared';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @MessagePattern(MESSAGES.USER_CREATE)
  create(@Payload() data: { createUserDto: CreateUserDto }) {
    return this.userServiceService.create(data.createUserDto);
  }

  @MessagePattern(MESSAGES.USER_FIND_ALL)
  findAll() {
    return this.userServiceService.findAll();
  }

  @MessagePattern(MESSAGES.USER_FIND_ONE)
  findOne(@Payload() data: { id: number }) {
    return this.userServiceService.findOne(data.id);
  }
}
