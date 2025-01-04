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
exports.MeetingService = void 0;
const common_1 = require("@nestjs/common");
const meeting_dto_1 = require("./dto/meeting.dto");
const meeting_repository_1 = require("./meeting.repository");
let MeetingService = class MeetingService {
    constructor(meetingRepository) {
        this.meetingRepository = meetingRepository;
    }
    async createMeeting(payload, user) {
        const [category] = await Promise.all([
            this.meetingRepository.findCategoryById(payload.categoryId),
        ]);
        if (!category) {
            throw new common_1.NotFoundException("카테고리를 찾을 수 없습니다.");
        }
        if (payload.startTime >= payload.endTime) {
            throw new common_1.BadRequestException("시작 시간은 종료 시간보다 빨라야 합니다 ");
        }
        if (payload.startTime < new Date()) {
            throw new common_1.BadRequestException("모임 시작 시간은 현재 시간 이후여야 합니다.");
        }
        const data = {
            hostId: user.id,
            title: payload.title,
            description: payload.description,
            categoryId: payload.categoryId,
            meetingImageUrl: payload.meetingImageUrl ?? null,
            startTime: payload.startTime,
            endTime: payload.endTime,
            maxPeople: payload.maxPeople,
        };
        const meeting = await this.meetingRepository.createMeeting(data);
        return meeting_dto_1.MeetingDto.from(meeting);
    }
    async getMeetings(query) {
        const meetings = await this.meetingRepository.getMeetings(query);
        return meeting_dto_1.MeetingListDto.from(meetings);
    }
    async getMyMeetings(user) {
        const meetings = await this.meetingRepository.getMeetingsJoinedBy(user.id);
        return meeting_dto_1.MeetingListDto.from(meetings);
    }
    async patchUpdateMeeting(meetingId, payload, user) {
        const data = this.validateNullOf(payload);
        const meeting = await this.meetingRepository.findMeetingById(meetingId);
        if (!meeting) {
            throw new common_1.NotFoundException("모임을 찾을 수 없습니다.");
        }
        if (meeting.hostId !== user.id) {
            throw new common_1.ForbiddenException("모임 주최자만 수정할 수 있습니다");
        }
        const startTime = payload.startTime ?? meeting.startTime;
        const endTime = payload.endTime ?? meeting.endTime;
        if (startTime >= endTime) {
            throw new common_1.BadRequestException("시작 시간은 종료 시간보다 빨라야 합니다.");
        }
        if (startTime < new Date()) {
            throw new common_1.BadRequestException("모임 시작 시간은 현재 시간 이후여야 합니다.");
        }
        if (payload.categoryId) {
            const category = await this.meetingRepository.findCategoryById(payload.categoryId);
            if (!category) {
                throw new common_1.NotFoundException("카테고리를 찾을 수 없습니다.");
            }
        }
        if (payload.maxPeople) {
            const participantsIds = await this.meetingRepository.getParticipantsIds(meetingId);
            if (participantsIds.length > payload.maxPeople) {
                throw new common_1.ConflictException("현재 참가 인원보다 적은 수로 변경할 수 없습니다.");
            }
        }
        const updatedMeeting = await this.meetingRepository.updateMeeting(meetingId, data);
        return meeting_dto_1.MeetingDto.from(updatedMeeting);
    }
    async deleteMeeting(meetingId, user) {
        const meeting = await this.meetingRepository.findMeetingById(meetingId);
        if (!meeting) {
            throw new common_1.NotFoundException("모임을 찾을 수 없습니다.");
        }
        if (meeting.hostId !== user.id) {
            throw new common_1.ForbiddenException("모임 주최자만 삭제할 수 있습니다.");
        }
        await this.meetingRepository.deleteMeeting(meetingId);
    }
    async joinMeeting(meetingId, user) {
        const meeting = await this.meetingRepository.findMeetingById(meetingId);
        if (!meeting) {
            throw new common_1.NotFoundException("모임을 찾을 수 없습니다.");
        }
        if (meeting.startTime < new Date()) {
            throw new common_1.ConflictException("이미 시작된 모임에 참여할 수 없습니다.");
        }
        const participantsIds = await this.meetingRepository.getParticipantsIds(meetingId);
        if (participantsIds.includes(user.id)) {
            throw new common_1.ConflictException("이미 참여한 모임입니다.");
        }
        if (participantsIds.length >= meeting.maxPeople) {
            throw new common_1.ConflictException("인원이 가득 찼습니다.");
        }
        await this.meetingRepository.joinMeeting(meetingId, user.id);
    }
    async leaveMeeting(meetingId, user) {
        const meeting = await this.meetingRepository.findMeetingById(meetingId);
        if (!meeting) {
            throw new common_1.NotFoundException("모임을 찾을 수 없습니다.");
        }
        if (meeting.hostId === user.id) {
            throw new common_1.ConflictException("모임 주최자는 모임에서 나갈 수 없습니다.");
        }
        if (meeting.startTime < new Date()) {
            throw new common_1.ConflictException("이미 시작된 모임에서 나갈 수 없습니다.");
        }
        const participantsIds = await this.meetingRepository.getParticipantsIds(meetingId);
        if (!participantsIds.includes(user.id)) {
            throw new common_1.ConflictException("참여하지 않은 모임입니다.");
        }
        await this.meetingRepository.leaveMeeting(meetingId, user.id);
    }
    validateNullOf(payload) {
        if (payload.title === null) {
            throw new common_1.BadRequestException("title은 null이 될 수 없습니다.");
        }
        if (payload.description === null) {
            throw new common_1.BadRequestException("description은 null이 될 수 없습니다.");
        }
        if (payload.categoryId === null) {
            throw new common_1.BadRequestException("categoryId는 null이 될 수 없습니다.");
        }
        if (payload.meetingImageUrl === null) {
            throw new common_1.BadRequestException("meetingImageUrl은 null이 될 수 없습니다.");
        }
        if (payload.startTime === null) {
            throw new common_1.BadRequestException("startTime은 null이 될 수 없습니다.");
        }
        if (payload.endTime === null) {
            throw new common_1.BadRequestException("endTime은 null이 될 수 없습니다.");
        }
        if (payload.maxPeople === null) {
            throw new common_1.BadRequestException("maxPeople은 null이 될 수 없습니다.");
        }
        return {
            title: payload.title,
            description: payload.description,
            categoryId: payload.categoryId,
            meetingImageUrl: payload.meetingImageUrl,
            startTime: payload.startTime,
            endTime: payload.endTime,
            maxPeople: payload.maxPeople,
        };
    }
};
exports.MeetingService = MeetingService;
exports.MeetingService = MeetingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meeting_repository_1.MeetingRepository])
], MeetingService);
//# sourceMappingURL=meeting.service.js.map