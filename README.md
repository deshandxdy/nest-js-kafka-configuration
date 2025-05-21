
# Kafka NestJS Integration

This project demonstrates how to configure and use [Kafka](https://kafka.apache.org/) with [NestJS](https://nestjs.com/) using both the low-level [kafkajs](https://kafka.js.org/) client and NestJS's microservices abstraction.

## Features

- Kafka producer and consumer services using kafkajs
- Configuration via environment variables and `@nestjs/config`
- Microservice integration using NestJS's Kafka transport

## Configuration

Set your Kafka connection details in `.env.local`:

```
KAFKA_BROKER=localhost:9092
KAFKA_CLIENT_ID=my-app
KAFKA_GROUP_ID=my-group
```

## Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application:**
   ```bash
   npm run start
   ```

3. **Kafka Integration:**
   - The producer and consumer use configuration from environment variables.
   - The microservice is connected using the configuration from `getKafkaConfig`.

## Project Structure

- `src/kafka/producer.service.ts` — Produces messages to Kafka topics.
- `src/kafka/consumer.service.ts` — Consumes messages from Kafka topics.
- `src/kafka/kafka.module.ts` — Provides Kafka instance and services.
- `src/app.module.ts` — Main application module.
- `src/main.ts` — Application bootstrap and microservice connection.

## Notes

- Make sure your Kafka broker is running and accessible at the address specified in `.env.local`.
- You can adjust client ID and group ID as needed for your environment.

---
