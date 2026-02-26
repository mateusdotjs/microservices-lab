import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserServiceService {
  constructor(
    @Inject('LOGGING_SERVICE') private readonly loggingClient: ClientProxy,
  ) {}

  async create(dto: any) {
    const user = { id: 1, ...dto };

    // this.loggingClient.emit(MESSAGES.LOG_EVENT, {
    //   action: 'user.created',
    //   payload: { email: dto.email },
    //   timestamp: new Date(),
    // });

    return user;
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return { id };
  }
}
