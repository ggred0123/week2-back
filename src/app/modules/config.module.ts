import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env`,
  validationSchema: Joi.object({
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRE_TIME: Joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRE_TIME: Joi.string().required(),
  }),
});
