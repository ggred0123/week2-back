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
exports.MeetingRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/services/prisma.service");
let MeetingRepository = class MeetingRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMeeting(data) {
        return this.prisma.meeting.create({
            data: {
                hostId: data.hostId,
                title: data.title,
                description: data.description,
                meetingImageUrl: data.meetingImageUrl,
                categoryId: data.categoryId,
                startTime: data.startTime,
                endTime: data.endTime,
                maxPeople: data.maxPeople,
            },
            select: {
                id: true,
                hostId: true,
                title: true,
                description: true,
                categoryId: true,
                meetingImageUrl: true,
                meetingJoinUser: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                startTime: true,
                endTime: true,
                maxPeople: true,
            },
        });
    }
    async updateMeeting(id, data) {
        return this.prisma.meeting.update({
            where: {
                id,
            },
            data: {
                title: data.title,
                description: data.description,
                categoryId: data.categoryId,
                meetingImageUrl: data.meetingImageUrl,
                startTime: data.startTime,
                endTime: data.endTime,
                maxPeople: data.maxPeople,
            },
            select: {
                id: true,
                hostId: true,
                title: true,
                description: true,
                categoryId: true,
                meetingImageUrl: true,
                meetingJoinUser: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                startTime: true,
                endTime: true,
                maxPeople: true,
            },
        });
    }
    async deleteMeeting(id) {
        await this.prisma.$transaction([
            this.prisma.meetingJoinUser.deleteMany({
                where: {
                    meetingId: id,
                },
            }),
            this.prisma.meeting.delete({
                where: {
                    id,
                },
            }),
        ]);
    }
    async findCategoryById(id) {
        return this.prisma.category.findUnique({
            where: {
                id,
            },
        });
    }
    async findMeetingById(id) {
        return this.prisma.meeting.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                hostId: true,
                title: true,
                description: true,
                categoryId: true,
                meetingImageUrl: true,
                meetingJoinUser: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                startTime: true,
                endTime: true,
                maxPeople: true,
            },
        });
    }
    async getMeetings(query) {
        return this.prisma.meeting.findMany({
            where: {
                categoryId: query.categoryId,
            },
            select: {
                id: true,
                hostId: true,
                title: true,
                description: true,
                categoryId: true,
                meetingImageUrl: true,
                meetingJoinUser: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                startTime: true,
                endTime: true,
                maxPeople: true,
            },
        });
    }
    async getMeetingsJoinedBy(userId) {
        return this.prisma.meeting.findMany({
            where: {
                meetingJoinUser: {
                    some: {
                        userId,
                    },
                },
            },
            select: {
                id: true,
                hostId: true,
                title: true,
                description: true,
                categoryId: true,
                meetingImageUrl: true,
                meetingJoinUser: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                startTime: true,
                endTime: true,
                maxPeople: true,
            },
        });
    }
    async getParticipantsIds(meetingId) {
        const data = await this.prisma.meetingJoinUser.findMany({
            where: {
                meetingId,
            },
            select: {
                userId: true,
            },
        });
        return data.map((d) => d.userId);
    }
    async joinMeeting(meetingId, userId) {
        await this.prisma.meetingJoinUser.create({
            data: {
                meetingId,
                userId,
            },
        });
    }
    async leaveMeeting(meetingId, userId) {
        await this.prisma.meetingJoinUser.delete({
            where: {
                meetingId_userId: {
                    meetingId,
                    userId,
                },
            },
        });
    }
};
exports.MeetingRepository = MeetingRepository;
exports.MeetingRepository = MeetingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MeetingRepository);
//# sourceMappingURL=meeting.repository.js.map