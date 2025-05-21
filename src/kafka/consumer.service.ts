import { Injectable, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, ConsumerRunConfig, ConsumerSubscribeTopics } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleDestroy {
  private consumers: Consumer[] = [];

  constructor(
    @Inject('KAFKA_INSTANCE') private readonly kafka: Kafka,
    private readonly configService: ConfigService,
  ) {}

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    try {
      const groupId = this.configService.get<string>('KAFKA_GROUP_ID');
      if (!groupId) {
        throw new Error('KAFKA_GROUP_ID is not defined in configuration');
      }
      const consumer = this.kafka.consumer({ groupId });
      await consumer.connect();
      await consumer.subscribe(topic);
      await consumer.run(config);
      this.consumers.push(consumer);
    } catch (error) {
      console.error('Error consuming messages:', error);
      throw error;
    }
  }

  async disconnectAllConsumers() {
    await Promise.all(this.consumers.map(consumer => consumer.disconnect()));
    this.consumers = [];
  }

  async onModuleDestroy() {
    await this.disconnectAllConsumers();
  }
}