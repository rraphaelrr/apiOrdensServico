import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
});
  app.use(new LoggerMiddleware().use);

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              
      forbidNonWhitelisted: true,   
      transform: true,              
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ordens API')
    .setDescription('API de Ordens de Serviço')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  app.useGlobalFilters(new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();