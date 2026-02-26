import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.apiGatewayService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.apiGatewayService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiGatewayService.findOneUser(+id);
  }
}
