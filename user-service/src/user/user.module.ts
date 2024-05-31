import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      { name: 'PRODUCT_SERVICE', transport: Transport.TCP, options: { host: 'localhost', port: 3001 } },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
