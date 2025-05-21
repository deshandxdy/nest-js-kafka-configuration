import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProducerService } from './kafka/producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producerService: ProducerService,
  ) {}

  @Get()
  async getHello() {
    console.log('Hello World!');
    return this.producerService.produce(
      'test-topic-2',
      [
        {
          key: 'key1',
          value: 'Hello Kafka! this is deshan',
        },
        {
          key: 'key1',
          value: 'Hello Kafka 3 ! this is deshan sdsd',
        },
      ],
    )
  }
}
