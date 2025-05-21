// src/kafka/kafka.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Kafka } from 'kafkajs';

import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'KAFKA_INSTANCE',
      useFactory: (configService: ConfigService) =>
        new Kafka({
          clientId: configService.get<string>('KAFKA_CLIENT_ID'),
          brokers: [configService.get<string>('KAFKA_BROKER') ?? 'localhost:9092'],
        }),
      inject: [ConfigService],
    },
    ProducerService,
    ConsumerService,
  ],
  exports: [ProducerService, 'KAFKA_INSTANCE'],
})
export class KafkaModule {}
