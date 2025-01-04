"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configModule = void 0;
const config_1 = require("@nestjs/config");
const Joi = require("joi");
exports.configModule = config_1.ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env`,
    validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRE_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRE_TIME: Joi.string().required(),
    }),
});
//# sourceMappingURL=config.module.js.map