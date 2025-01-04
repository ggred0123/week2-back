import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/services/prisma.service";
import { CreateMeetingData } from "./type/create-meeting-data.type";
import { Category } from "@prisma/client";
import { MeetingQuery } from "./query/meeting.query";
import { MeetingData } from "./type/meeting-data.type";
import { UpdateMeetingData } from "./type/update-meeting-data.type";

@Injectable()
export class MeetingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMeeting(data: CreateMeetingData): Promise<MeetingData> {
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

  async updateMeeting(
    id: number,
    data: UpdateMeetingData
  ): Promise<MeetingData> {
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

  async deleteMeeting(id: number): Promise<void> {
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

  async findCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findMeetingById(id: number): Promise<MeetingData | null> {
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

  async getMeetings(query: MeetingQuery): Promise<MeetingData[]> {
    return this.prisma.meeting.findMany({
      where: {
        categoryId: query.categoryId,
        startTime: {
          gte: new Date(),
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

  async getMeetingsJoinedBy(userId: number): Promise<MeetingData[]> {
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

  async getParticipantsIds(meetingId: number): Promise<number[]> {
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

  async joinMeeting(meetingId: number, userId: number): Promise<void> {
    await this.prisma.meetingJoinUser.create({
      data: {
        meetingId,
        userId,
      },
    });
  }

  async leaveMeeting(meetingId: number, userId: number): Promise<void> {
    await this.prisma.meetingJoinUser.delete({
      where: {
        meetingId_userId: {
          meetingId,
          userId,
        },
      },
    });
  }
}
