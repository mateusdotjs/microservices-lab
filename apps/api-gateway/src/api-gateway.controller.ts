import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post()
  createUser(@Body() createUserDto: any) {
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
