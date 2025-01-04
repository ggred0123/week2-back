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
exports.PatchUpdateMeetingPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PatchUpdateMeetingPayload {
}
exports.PatchUpdateMeetingPayload = PatchUpdateMeetingPayload;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "모임 이름",
        type: String,
    }),
    __metadata("design:type", Object)
], PatchUpdateMeetingPayload.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "모임 설명",
        type: String,
    }),
    __metadata("design:type", Object)
], PatchUpdateMeetingPayload.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "카테고리 ID",
        type: Number,
    }),
    __metadata("design:type", Object)
], PatchUpdateMeetingPayload.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "모임 이미지 URL",
        type: String,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PatchUpdateMeetingPayload.prototype, "meetingImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "이벤트 시작 시간",
        type: Date,
    }),
    __metadata("design:type", Object)
], PatchUpdateMeetingPayload.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "이벤트 종료 시간",
        type: Date,
    }),
    __metadata("design:type", Object)
], PatchUpdateMeetingPayload.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: "이벤트에 참여가능한 최대 인원",
        type: Number,
    }),
    __metadata("design:type", Object)
], PatchUpdateMeetingPayload.prototype, "maxPeople", void 0);
//# sourceMappingURL=patch-update-meeting.payload.js.map