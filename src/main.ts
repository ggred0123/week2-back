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

  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // OPTIONS 추가
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-amz-date", // S3 필수 헤더
      "x-amz-acl", // S3 ACL 설정 헤더
      "x-amz-content-sha256", // S3 컨텐츠 해시
      "x-amz-meta-*", // S3 메타데이터
      "x-amz-credential", // S3 인증 정보
      "x-amz-algorithm", // S3 서명 알고리즘
      "x-amz-security-token", // S3 보안 토큰
      "x-amz-signature", // S3 서명
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

  // Cloud Run을 위한 포트 설정

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0", () => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();
