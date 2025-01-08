import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./common/filter/exception.filter";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS 설정 업데이트
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://week2-front-305743959550.asia-northeast3.run.app", // Cloud Run 프론트엔드 도메인
      /\.asia-northeast3\.run\.app$/, // Cloud Run 도메인 패턴 매칭
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-amz-date",
      "x-amz-acl",
      "x-amz-content-sha256",
      "x-amz-meta-*",
      "x-amz-credential",
      "x-amz-algorithm",
      "x-amz-security-token",
      "x-amz-signature",
      "Access-Control-Allow-Origin",
    ],
    exposedHeaders: [
      "x-amz-server-side-encryption",
      "x-amz-request-id",
      "x-amz-id-2",
      "ETag",
    ],
    maxAge: 3600,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });

  const config = new DocumentBuilder()
    .setTitle("Madcamp-week2 Server")
    .setDescription("Madcamp-week2 API description")
    .setVersion("1.0")
    .addTag("Madcamp-week2")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const httpAdapter = app.getHttpAdapter().getInstance();
  httpAdapter.get("/", (req, res) => {
    res.redirect("/docs");
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0", () => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();
