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
exports.MeetingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const meeting_service_1 = require("./meeting.service");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const meeting_dto_1 = require("./dto/meeting.dto");
const create_meeting_payload_1 = require("./payload/create-meeting.payload");
const user_decorator_1 = require("../auth/decorator/user.decorator");
const meeting_query_1 = require("./query/meeting.query");
const patch_update_meeting_payload_1 = require("./payload/patch-update-meeting.payload");
let MeetingController = class MeetingController {
    constructor(meetingService) {
        this.meetingService = meetingService;
    }
    async createMeeting(payload, user) {
        return this.meetingService.createMeeting(payload, user);
    }
    async getMeetings(query) {
        return this.meetingService.getMeetings(query);
    }
    async getMyMeetings(user) {
        return this.meetingService.getMyMeetings(user);
    }
    async patchUpdateMeeting(meetingId, payload, user) {
        return this.meetingService.patchUpdateMeeting(meetingId, payload, user);
    }
    async deleteMeeting(meetingId, user) {
        return this.meetingService.deleteMeeting(meetingId, user);
    }
    async joinMeeting(meetingId, user) {
        return this.meetingService.joinMeeting(meetingId, user);
    }
    async leaveMeeting(meetingId, user) {
        return this.meetingService.leaveMeeting(meetingId, user);
    }
};
exports.MeetingController = MeetingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "모임 생성" }),
    (0, swagger_1.ApiCreatedResponse)({ type: meeting_dto_1.MeetingDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meeting_payload_1.CreateMeetingPayload, Object]),
    __metadata("design:returntype", Promise)
], MeetingController.prototype, "createMeeting", null);
__decorate([
    (0, common_1.Get)(":categoryId"),
    (0, swagger_1.ApiOperation)({ summary: "모임 전체 또는 필터 조회" }),
    (0, swagger_1.ApiOkResponse)({ type: meeting_dto_1.MeetingListDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meeting_query_1.MeetingQuery]),
    __metadata("design:returntype", Promise)
], MeetingController.prototype, "getMeetings", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "내가 참여한 모임 조회" }),
    (0, swagger_1.ApiOkResponse)({ type: meeting_dto_1.MeetingListDto }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeetingController.prototype, "getMyMeetings", null);
__decorate([
    (0, common_1.Patch)(":meetingId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "모임 수정 (PATCH)" }),
    (0, swagger_1.ApiOkResponse)({ type: meeting_dto_1.MeetingDto }),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, patch_update_meeting_payload_1.PatchUpdateMeetingPayload, Object]),
    __metadata("design:returntype", Promise)
], MeetingController.prototype, "patchUpdateMeeting", null);
__decorate([
    (0, common_1.Delete)(":meetingId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MeetingController.prototype, "deleteMeeting", null);
__decorate([
    (0, common_1.Post)(":meetingId/join"),
    (0, common_1.HttpCode)(204),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "모임 참가" }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MeetingController.prototype, "joinMeeting", null);
__decorate([
    (0, common_1.Post)(":meetingId/leave"),
    (0, common_1.HttpCode)(204),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "모임 나가기" }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MeetingController.prototype, "leaveMeeting", null);
exports.MeetingController = MeetingController = __decorate([
    (0, common_1.Controller)("meetings"),
    (0, swagger_1.ApiTags)("Meeting API"),
    __metadata("design:paramtypes", [meeting_service_1.MeetingService])
], MeetingController);
//# sourceMappingURL=meeting.controller.js.map