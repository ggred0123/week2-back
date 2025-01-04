"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exception_filter_1 = require("./common/filter/exception.filter");
const path_1 = require("path");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
    }));
    app.useGlobalFilters(new exception_filter_1.HttpExceptionFilter());
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "uploads"), {
        prefix: "/uploads/",
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Madcamp-week2 Server")
        .setDescription("Madcamp-week2 API description")
        .setVersion("1.0")
        .addTag("Madcamp-week2")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("docs", app, document);
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
//# sourceMappingURL=main.js.map