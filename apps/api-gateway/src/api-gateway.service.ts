import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES } from '@app/shared/messages';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userServiceClient.send(MESSAGES.USER_CREATE, { createUserDto });
  }

  findAllUsers() {
    return this.userServiceClient.send(MESSAGES.USER_FIND_ALL, {});
  }

  findOneUser(id: number) {
    return this.userServiceClient.send(MESSAGES.USER_FIND_ONE, { id });
  }
}
