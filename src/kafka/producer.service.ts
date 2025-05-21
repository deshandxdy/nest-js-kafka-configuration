import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private producer: Producer;

  constructor(@Inject('KAFKA_INSTANCE') private readonly kafka: Kafka) {
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(topic: string, messages: { key?: string; value: string }[]) {
    try {
      const record: ProducerRecord = {
        topic,
        messages,
      };
      await this.producer.send(record);
    } catch (error) {
      console.error('Error producing message:', error);
      throw error;
    }
  }

  async onApplicationShutdown(signal?: string) {
    await this.producer.disconnect();
  }
}