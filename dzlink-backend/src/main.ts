import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 4000;
  const isDev = configService.get<string>('DEBUG') === 'true';

  // Basic middlewares and setup
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // Serve static files from /uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // CORS: Allow all in dev, restrict in prod
  app.enableCors({
    origin: '*', // or restrict to your frontend host
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('DZLink API')
      .setDescription('DZLink backend')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    Logger.log('Swagger enabled at /docs');
  } else {
    Logger.log('Swagger is disabled');
  }

  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(`Server running on http://localhost:${PORT}/api 🚀`);
  });
}
bootstrap();
