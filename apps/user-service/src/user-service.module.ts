import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get('DB_USER', 'root'),
          password: configService.get('DB_PASS', 'password'),
          database: configService.get('DB_NAME', 'user_service_db'),
          autoLoadModels: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'LOGGING_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>(
                'RABBITMQ_URL',
                'amqp://localhost:5672',
              ),
            ],
            queue: 'logging_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
