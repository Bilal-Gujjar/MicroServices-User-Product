import { Controller, Get, Post, Body, Param, Put, Delete ,Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name)
  constructor(private readonly userService: UserService) {}

  @EventPattern('product_created')
  handleProductCreated(data: Record<string, unknown>) {
    this.logger.log('Received Product_created event with data: ' + JSON.stringify(data));
  }

  @EventPattern('product_updated')
  handleProductUpdate(data: Record<string, unknown>) {
    this.logger.log('Received Product_Updated event with data: ' + JSON.stringify(data));
  }

  @EventPattern('product_deleted')
  handleProductDeleted(data: Record<string, unknown>) {
    this.logger.log('Received Product_Deleted event with data: ' + JSON.stringify(data));
  }

  @EventPattern('product_findAll')
  handleProductAllfind(data: Record<string, unknown>) {
    this.logger.log('Received user_FindAll event with data: ' + JSON.stringify(data));
  }

  @EventPattern('product_findOne')
  handleProductOne(data: Record<string, unknown>) {
    this.logger.log('Received user_findOne event with data: ' + JSON.stringify(data));
  }
  


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }


}
