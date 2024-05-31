import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ClientsModule.register([
      { 
        name: 'USER_SERVICE', 
        transport: Transport.TCP, 
        options: { host: process.env.USER_SERVICE_HOST, port: parseInt(process.env.USER_SERVICE_PORT, 10) } 
      },
    ]),
    ProductModule,
  ],
})
export class AppModule {}
