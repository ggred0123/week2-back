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
exports.UpdateUserPayload = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const user_enum_1 = require("../enum/user.enum");
class UpdateUserPayload {
}
exports.UpdateUserPayload = UpdateUserPayload;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "이메일",
        type: String,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "이름",
        type: String,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiPropertyOptional)({
        description: "생일",
        type: Date,
        nullable: true,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "대학 ID",
        type: Number,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "universityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "성별",
        enum: user_enum_1.Sex,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "sex", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "MBTI ID",
        type: Number,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "mbtiId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "분반 ID",
        type: Number,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "classId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "알콜 레벨",
        type: Number,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "alcoholLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "유저 이미지 URL",
        type: String,
        nullable: true,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "코딩 레벨",
        type: Number,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "programmingLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "코딩 분야",
        type: String,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "programmingField", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "코딩 언어",
        type: String,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "programmingLanguage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "선호 알콜 ID",
        type: Number,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "preferredAlcoholId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "리더십 레벨",
        type: Number,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "leadershipLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "매드 캠프 상태",
        enum: user_enum_1.MadCampStatus,
    }),
    __metadata("design:type", Object)
], UpdateUserPayload.prototype, "madCampStatus", void 0);
//# sourceMappingURL=update-user.payload.js.map