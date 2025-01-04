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
exports.MeetingListDto = exports.MeetingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MeetingDto {
    static from(data) {
        return {
            id: data.id,
            hostId: data.hostId,
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            meetingImageUrl: data.meetingImageUrl,
            startTime: data.startTime,
            endTime: data.endTime,
            maxPeople: data.maxPeople,
            location: data.location,
            keyword: data.keyword,
        };
    }
    static fromArray(data) {
        return data.map((meeting) => MeetingDto.from(meeting));
    }
}
exports.MeetingDto = MeetingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "모임 ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], MeetingDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "호스트 ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], MeetingDto.prototype, "hostId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "카테고리 ID",
        type: Number,
    }),
    __metadata("design:type", Number)
], MeetingDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "모임 이미지 URL",
        type: String,
        nullable: true,
    }),
    __metadata("design:type", Object)
], MeetingDto.prototype, "meetingImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "이름",
        type: String,
    }),
    __metadata("design:type", String)
], MeetingDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "설명",
        type: String,
    }),
    __metadata("design:type", String)
], MeetingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "시작 시간",
        type: Date,
    }),
    __metadata("design:type", Date)
], MeetingDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "종료 시간",
        type: Date,
    }),
    __metadata("design:type", Date)
], MeetingDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "최대 인원",
        type: Number,
    }),
    __metadata("design:type", Number)
], MeetingDto.prototype, "maxPeople", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "위치",
        type: String,
    }),
    __metadata("design:type", String)
], MeetingDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "키워드",
        type: String,
    }),
    __metadata("design:type", String)
], MeetingDto.prototype, "keyword", void 0);
class MeetingListDto {
    static from(data) {
        return {
            meetings: MeetingDto.fromArray(data),
        };
    }
}
exports.MeetingListDto = MeetingListDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "모임 목록",
        type: [MeetingDto],
    }),
    __metadata("design:type", Array)
], MeetingListDto.prototype, "meetings", void 0);
//# sourceMappingURL=meeting.dto.js.map