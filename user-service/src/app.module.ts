import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule.register([
      { 
        name: 'PRODUCT_SERVICE', 
        transport: Transport.TCP, 
        options: { host: process.env.PRODUCT_SERVICE_HOST, port: parseInt(process.env.PRODUCT_SERVICE_PORT, 10) } 
      },
    ]),
    UserModule,
  ],
})
export class AppModule {}
