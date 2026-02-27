import { CreateUserDto, LOG_ACTIONS, MESSAGES } from '@app/shared';
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
    try {
      const user = await this.userModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      });

      this.loggingClient.emit(MESSAGES.LOG_EVENT, {
        action: LOG_ACTIONS.USER_CREATED,
        payload: { email: createUserDto.email },
        timestamp: new Date(),
      });

      return user;
    } catch (error) {
      this.loggingClient.emit(MESSAGES.LOG_EVENT, {
        action: LOG_ACTIONS.USER_CREATE_ERROR,
        payload: { email: createUserDto.email, error: error.message },
        timestamp: new Date(),
      });

      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.findAll();

      this.loggingClient.emit(MESSAGES.LOG_EVENT, {
        action: LOG_ACTIONS.USER_FETCH_ALL,
        payload: { count: users.length },
        timestamp: new Date(),
      });

      return users;
    } catch (error) {
      this.loggingClient.emit(MESSAGES.LOG_EVENT, {
        action: LOG_ACTIONS.USER_FETCH_ALL_ERROR,
        payload: { error: error.message },
        timestamp: new Date(),
      });

      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user) {
        this.loggingClient.emit(MESSAGES.LOG_EVENT, {
          action: LOG_ACTIONS.USER_NOT_FOUND,
          payload: { id },
          timestamp: new Date(),
        });

        return null;
      }

      this.loggingClient.emit(MESSAGES.LOG_EVENT, {
        action: LOG_ACTIONS.USER_FETCHED,
        payload: { id },
        timestamp: new Date(),
      });

      return user;
    } catch (error) {
      this.loggingClient.emit(MESSAGES.LOG_EVENT, {
        action: LOG_ACTIONS.USER_FETCH_ERROR,
        payload: { id, error: error.message },
        timestamp: new Date(),
      });

      throw error;
    }
  }
}
