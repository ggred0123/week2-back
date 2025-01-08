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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./dto/user.dto");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const update_user_payload_1 = require("./payload/update-user.payload");
const user_decorator_1 = require("../auth/decorator/user.decorator");
const common_2 = require("@nestjs/common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserById(userId) {
        return this.userService.getUserById(userId);
    }
    async updateUser(userId, payload, user) {
        return this.userService.updateUser(userId, payload, user);
    }
    async getMe(user) {
        console.log("Current User:", user);
        try {
            if (!user || !user.id) {
                throw new common_2.BadRequestException("유효하지 않은 사용자 정보입니다.");
            }
            return await this.userService.getUserById(user.id);
        }
        catch (error) {
            console.error("Error in getMe:", error);
            throw new common_2.InternalServerErrorException("서버 내부 오류가 발생했습니다.");
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(":userId"),
    (0, swagger_1.ApiOperation)({ summary: "유저 정보를 가져옵니다" }),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)(":userId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "유저 정보를 수정합니다" }),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto }),
    __param(0, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_payload_1.UpdateUserPayload, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "내 정보를 가져옵니다" }),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map