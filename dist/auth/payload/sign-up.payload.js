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
exports.SignUpPayload = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const user_enum_1 = require("../../user/enum/user.enum");
class SignUpPayload {
}
exports.SignUpPayload = SignUpPayload;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "이름",
        type: String,
    }),
    __metadata("design:type", String)
], SignUpPayload.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: "알콜 레벨",
        type: Number,
    }),
    __metadata("design:type", Number)
], SignUpPayload.prototype, "alcoholLevel", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_enum_1.MadCampStatus),
    (0, swagger_1.ApiProperty)({
        description: "마드캠 상태",
        enum: user_enum_1.MadCampStatus,
    }),
    __metadata("design:type", String)
], SignUpPayload.prototype, "madCampStatus", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiProperty)({
        description: "생년월일",
        type: Date,
    }),
    __metadata("design:type", Date)
], SignUpPayload.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: "대학교 ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], SignUpPayload.prototype, "universityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "전공",
        type: String,
    }),
    __metadata("design:type", String)
], SignUpPayload.prototype, "major", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: "MBTI ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], SignUpPayload.prototype, "mbtiId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: "분반",
        type: Number,
    }),
    __metadata("design:type", Number)
], SignUpPayload.prototype, "classId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "성별",
        enum: user_enum_1.Sex,
    }),
    __metadata("design:type", String)
], SignUpPayload.prototype, "sex", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "이미지 URL",
        type: String,
        nullable: true,
    }),
    __metadata("design:type", Object)
], SignUpPayload.prototype, "imageUrl", void 0);
//# sourceMappingURL=sign-up.payload.js.map