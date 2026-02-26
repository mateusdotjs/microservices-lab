import { CreateUserDto, MESSAGES } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserServiceService {
  constructor(
    @Inject('LOGGING_SERVICE') private readonly loggingClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = { id: 1, ...createUserDto };

    this.loggingClient.emit(MESSAGES.LOG_EVENT, {
      action: 'user.created',
      payload: { email: createUserDto.email },
      timestamp: new Date(),
    });

    return user;
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return { id };
  }
}
