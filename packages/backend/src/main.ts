import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Level Up API')
    .setDescription('The Level Up API documentation')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('quests')
    .addTag('achievements')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
