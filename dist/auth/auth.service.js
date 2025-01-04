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
    async signUp(payload) {
        const user = await this.authRepository.getUserByEmail(payload.email);
        if (user) {
            throw new common_1.ConflictException("이미 사용중인 이메일입니다.");
        }
        const hashedPassword = await this.passwordService.getEncryptPassword(payload.password);
        const inputData = {
            email: payload.email,
            password: hashedPassword,
            name: payload.name,
            birthday: payload.birthday,
            universityId: payload.universityId,
            major: payload.major,
            alcoholLevel: payload.alcoholLevel,
            madCampStatus: payload.madCampStatus,
            mbtiId: payload.mbtiId,
            classId: payload.classId,
            sex: payload.sex,
            imageUrl: payload.imageUrl ?? null,
        };
        const createdUser = await this.authRepository.createUser(inputData);
        return this.generateTokens(createdUser.id);
    }
    async login(payload) {
        const user = await this.authRepository.getUserByEmail(payload.email);
        if (!user) {
            throw new common_1.NotFoundException("존재하지 않는 이메일입니다.");
        }
        const isPasswordMatch = await this.passwordService.validatePassword(payload.password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.ConflictException("비밀번호가 일치하지 않습니다.");
        }
        return this.generateTokens(user.id);
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
    async changePassword(payload, user) {
        const isValid = await this.passwordService.validatePassword(payload.currentPassword, user.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException("현재 비밀번호가 일치하지 않습니다.");
        }
        const hashedPassword = await this.passwordService.getEncryptPassword(payload.newPassword);
        await this.authRepository.updateUser(user.id, {
            password: hashedPassword,
        });
    }
    async generateTokens(userId) {
        const tokens = this.tokenService.generateTokens({ userId });
        await this.authRepository.updateUser(userId, {
            refreshToken: tokens.refreshToken,
        });
        return tokens;
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