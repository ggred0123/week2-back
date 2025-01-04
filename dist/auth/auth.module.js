"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const auth_repository_1 = require("./auth.repository");
const jwt_strategy_1 = require("./guard/jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt_password_service_1 = require("./bcrypt-password.service");
const token_service_1 = require("./token.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                    signOptions: {
                        expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRE_TIME')}`,
                    },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            auth_repository_1.AuthRepository,
            jwt_strategy_1.JwtStrategy,
            bcrypt_password_service_1.BcryptPasswordService,
            token_service_1.TokenService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map