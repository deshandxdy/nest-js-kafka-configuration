import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
  ) { }
  async onModuleInit() {
    await this.consumerService.consume({
      topics: ['test-topic', 'test-topic-2'],
      fromBeginning: true,
    },
      {
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
          console.log({
            partition,
            topic,
            offset: message.offset,
            value: message.value?.toString(),
          });
        },
      },
    );
  }

}