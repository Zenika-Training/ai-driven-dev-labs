import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Petclinic API')
    .setDescription('Greenfield petclinic backend API')
    .setVersion('0.0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-ui.html', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
