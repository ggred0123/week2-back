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
exports.UserListDto = exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_enum_1 = require("../enum/user.enum");
class UserDto {
    static from(data) {
        return {
            id: data.id,
            name: data.name,
            birthday: data.birthday,
            universityId: data.universityId,
            alcoholLevel: data.alcoholLevel,
            madCampStatus: data.madCampStatus,
            sex: data.sex,
            mbtiId: data.mbtiId,
            classId: data.classId,
            imageUrl: data.imageUrl,
            alcoholIds: data.preferredAlcohol.map((alcohol) => alcohol.alcoholId),
        };
    }
    static fromArray(data) {
        return data.map((user) => UserDto.from(user));
    }
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "유저 ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "대학교 ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "universityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "알콜 레벨",
        type: Number,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "alcoholLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "매드 캠프 재학 여부",
        enum: user_enum_1.MadCampStatus,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "madCampStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "성별",
        enum: user_enum_1.Sex,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "sex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "MBTI ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "mbtiId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "분반 ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "유저 이미지 URL",
        type: String,
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "이름",
        type: String,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "생일",
        type: Date,
    }),
    __metadata("design:type", Date)
], UserDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "선호 알콜",
        type: [Number],
    }),
    __metadata("design:type", Array)
], UserDto.prototype, "alcoholIds", void 0);
class UserListDto {
    static from(data) {
        return {
            users: UserDto.fromArray(data),
        };
    }
}
exports.UserListDto = UserListDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "유저 목록",
        type: [UserDto],
    }),
    __metadata("design:type", Array)
], UserListDto.prototype, "users", void 0);
//# sourceMappingURL=user.dto.js.map