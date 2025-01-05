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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("./auth.repository");
const bcrypt_password_service_1 = require("./bcrypt-password.service");
const token_service_1 = require("./token.service");
let AuthService = class AuthService {
    constructor(authRepository, passwordService, tokenService) {
        this.authRepository = authRepository;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }
    async refresh(refreshToken) {
        const data = this.tokenService.verifyRefreshToken(refreshToken);
        const user = await this.authRepository.getUserById(data.userId);
        if (!user) {
            throw new common_1.NotFoundException("존재하지 않는 사용자입니다.");
        }
        if (user.refreshToken !== refreshToken) {
            throw new common_1.UnauthorizedException("유효하지 않은 토큰입니다.");
        }
        return this.generateTokens(user.id);
    }
    async generateTokens(userId) {
        const tokens = this.tokenService.generateTokens({ userId });
        await this.authRepository.updateUser(userId, {
            refreshToken: tokens.refreshToken,
        });
        return tokens;
    }
    async googleLogin(googleUser) {
        try {
            if (!googleUser?.email) {
                throw new Error("Invalid Google user data");
            }
            const user = await this.authRepository.getUserByEmail(googleUser.email);
            if (user) {
                if (user.registrationStatus === "COMPLETED") {
                    const tokens = await this.generateTokens(user.id);
                    return { tokens, isNewUser: false };
                }
                const tokens = await this.generateTokens(user.id);
                return { tokens, isNewUser: true };
            }
            const signUpData = {
                email: googleUser.email,
                name: googleUser.name || "Unknown",
                imageUrl: googleUser.imageUrl || null,
                universityId: 1,
                major: "미입력",
                alcoholLevel: 0,
                madCampStatus: "InCamp",
                mbtiId: 1,
                classId: 1,
                sex: "MALE",
                birthday: new Date(),
                registrationStatus: "TEMPORARY",
            };
            const newUser = await this.authRepository.createUser(signUpData);
            const tokens = await this.generateTokens(newUser.id);
            return { tokens, isNewUser: true };
        }
        catch (error) {
            console.error("Google login error:", error);
            if (error instanceof Error) {
                throw new Error("Google login failed: " + error.message);
            }
            throw new Error("Google login failed: Unknown error");
        }
    }
    async updateUserProfile(userId, payload) {
        const user = await this.authRepository.getUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException("사용자를 찾을 수 없습니다.");
        }
        await this.authRepository.updateUser(userId, {
            ...payload,
            registrationStatus: "COMPLETED",
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        bcrypt_password_service_1.BcryptPasswordService,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map