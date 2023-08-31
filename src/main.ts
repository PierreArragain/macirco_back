import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set contentSecurityPolicy to false for helmet middleware
  app.use(
    helmet({ contentSecurityPolicy: false }),
    bodyParser.json({ limit: '50mb' }),
  );

  // to use swagger to API Docs
  const options = new DocumentBuilder()
    .setTitle('MaCirco API')
    .setDescription('API for MaCirco project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap(); // TODO: Call the bootstrap function to start the NestJS application
