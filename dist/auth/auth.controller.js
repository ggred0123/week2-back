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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const token_dto_1 = require("./dto/token.dto");
const sign_up_payload_1 = require("./payload/sign-up.payload");
const user_decorator_1 = require("./decorator/user.decorator");
const jwt_auth_guard_1 = require("./guard/jwt-auth.guard");
const passport_1 = require("@nestjs/passport");
const login_payload_1 = require("./payload/login.payload");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(payload, res) {
        const tokens = await this.authService.login(payload);
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            domain: "localhost",
        });
        return token_dto_1.TokenDto.from(tokens.accessToken);
    }
    async completeProfile(payload, user, res) {
        try {
            await this.authService.updateUserProfile(user.id, payload);
            return { message: "프로필 업데이트 완료" };
        }
        catch (error) {
            console.error("Error completing profile:", error);
            throw error;
        }
    }
    async refresh(req, res) {
        const tokens = await this.authService.refresh(req.cookies["refreshToken"]);
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        return token_dto_1.TokenDto.from(tokens.accessToken);
    }
    async googleAuth() {
    }
    async googleAuthCallback(req, res) {
        try {
            console.log("Google User Data:", req.user);
            if (!req.user) {
                throw new Error("Google OAuth 인증 실패: 사용자 데이터가 없습니다.");
            }
            const { tokens, isNewUser } = await this.authService.googleLogin(req.user);
            console.log("Generated Tokens:", tokens);
            console.log("Is New User:", isNewUser);
            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            const frontendURL = "https://week2-front-305743959550.asia-northeast3.run.app";
            return res.redirect(`${frontendURL}/auth/google/callback?accessToken=${tokens.accessToken}&isNewUser=${isNewUser}`);
        }
        catch (error) {
            console.error("Error in Google Auth Callback:", error);
            return res.redirect("https://week2-front-305743959550.asia-northeast3.run.app/error");
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "로그인" }),
    (0, swagger_1.ApiOkResponse)({ type: token_dto_1.TokenDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_payload_1.LoginPayload, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Put)("complete-profile"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "구글 로그인 후 추가 정보 입력" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_payload_1.SignUpPayload, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "completeProfile", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "토큰 갱신" }),
    (0, swagger_1.ApiOkResponse)({ type: token_dto_1.TokenDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)("google"),
    (0, swagger_1.ApiOperation)({ summary: "구글 로그인" }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)("google/callback"),
    (0, swagger_1.ApiOperation)({ summary: "구글 로그인 콜백" }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, swagger_1.ApiTags)("Auth API"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map