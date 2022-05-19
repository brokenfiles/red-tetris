import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {WsAllExceptionsFilter} from "./filters/WsAllExceptions.filter";
import {BadRequestTransformationFilter} from "./filters/BadRequestTransformation.filter";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new WsAllExceptionsFilter())
  await app.listen(process.env.PORT);
}
bootstrap();
