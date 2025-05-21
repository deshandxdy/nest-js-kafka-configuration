
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const getKafkaConfig = (configService: ConfigService): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: configService.get<string>('KAFKA_CLIENT_ID') || 'default-client',
      brokers: [configService.get<string>('KAFKA_BROKER') || 'localhost:9092'],
    },
    consumer: {
      groupId: configService.get<string>('KAFKA_GROUP_ID') || 'default-group',
    },
  },
});
