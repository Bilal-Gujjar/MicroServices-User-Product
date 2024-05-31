// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const microservice = app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.TCP,
//     options: { host: '0.0.0.0', port: parseInt(process.env.MICROSERVICE_PORT, 10) || 3000 },
//   });
//   await app.startAllMicroservices();
//   await app.listen(4000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: parseInt(process.env.MICROSERVICE_PORT, 10) || 3000 },
  });
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
