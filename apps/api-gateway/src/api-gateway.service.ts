import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient) {}

  createUser(dto: any) {
    return this.userServiceClient.send();
  }

  findAllUsers() {
    return this.userServiceClient.send();
  }

  findOneUser(id: number) {
    return this.userServiceClient.send();
  }
}
