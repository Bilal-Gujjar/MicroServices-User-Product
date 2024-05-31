import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    this.logger.log('Emitting user_created event');
    this.productServiceClient.emit('user_created', newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    this.logger.log('Emitting user_found_all event');
    this.productServiceClient.emit('user_found_all', users);
    return users;
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
    this.logger.log('Emitting user_updated event');
    this.productServiceClient.emit('user_updated', { id, ...updateUserDto });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
    this.logger.log('Emitting user_deleted event');
    this.productServiceClient.emit('user_deleted', { id });
  }
}

