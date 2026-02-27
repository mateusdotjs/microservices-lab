import { CreateUserDto, MESSAGES } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UserServiceService {
  constructor(
    @Inject('LOGGING_SERVICE') private readonly loggingClient: ClientProxy,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    this.loggingClient.emit(MESSAGES.LOG_EVENT, {
      action: 'user.created',
      payload: { email: createUserDto.email },
      timestamp: new Date(),
    });

    return user;
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }
}
