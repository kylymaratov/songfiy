import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setApiDocs = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Songfiy API')
    .setDescription('Free music streaming API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
};
