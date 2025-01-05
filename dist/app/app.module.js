"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_module_1 = require("./modules/config.module");
const logger_middleware_1 = require("../common/middlewares/logger.middleware");
const common_module_1 = require("../common/common.module");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
const meeting_module_1 = require("../meeting/meeting.module");
const category_module_1 = require("../category/category.module");
const community_module_1 = require("../community/community.module");
const extra_module_1 = require("../extra/extra.module");
const aws_module_1 = require("../common/aws/aws.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_module_1.configModule,
            meeting_module_1.MeetingModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            common_module_1.CommonModule,
            community_module_1.CommunityModule,
            extra_module_1.ExtraModule,
            aws_module_1.AwsS3Module,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map