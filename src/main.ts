import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/main/config.type';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import validationOptions from './utils/validation-options';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);
  
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const options = new DocumentBuilder()
    .setTitle('Pantore API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'saturn',
      darkMode: true,
      hideDownloadButton: true
    }),
  )
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
