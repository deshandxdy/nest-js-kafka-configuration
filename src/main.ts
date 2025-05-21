import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getKafkaConfig } from './configs/kafja.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.connectMicroservice(getKafkaConfig);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
