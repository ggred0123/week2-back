"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let TokenService = class TokenService {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    generateTokens(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }
    verifyAccessToken(token) {
        try {
            const data = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            });
            const { iat, exp, ...result } = data;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('토큰이 유효하지 않습니다.');
        }
    }
    verifyRefreshToken(token) {
        try {
            const data = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            });
            const { iat, exp, ...result } = data;
            return result;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('토큰이 유효하지 않습니다.');
        }
    }
    generateAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRE_TIME'),
        });
    }
    generateRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRE_TIME'),
        });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map