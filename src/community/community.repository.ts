import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/services/prisma.service";
import {
  CreateCommunityContentData,
  CreateCommunityData,
} from "./type/create-community-data.type";
import {
  CommunityContentData,
  CommunityData,
} from "./type/community-data.type";
import { User, Community, Prisma, PrismaPromise } from "@prisma/client";
import { UpdateCommunityContentData } from "./type/update-community-data.type";
import { filter } from "lodash";
@Injectable()
export class CommunityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCommunity(data: CreateCommunityData): Promise<CommunityData> {
    return this.prisma.community.create({
      data: {
        title: data.title,
      },
      select: {
        id: true,
        title: true,
      },
    });
  }

  async createCommunityContent(
    data: CreateCommunityContentData
  ): Promise<CommunityContentData> {
    return this.prisma.communityContent.create({
      data: {
        communityId: data.communityId,
        title: data.title,
        content: data.content,
        contentImageUrl: data.contentImageUrl,
      },
      select: {
        id: true,
        title: true,
        communityId: true,
        content: true,
        contentImageUrl: true,
        likeCount: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getCommunities(): Promise<CommunityData[]> {
    return this.prisma.community.findMany({
      select: {
        id: true,
        title: true,
      },
    });
  }

  async getCommunityContents(
    communityId: number
  ): Promise<CommunityContentData[]> {
    return this.prisma.communityContent.findMany({
      where: {
        community: {
          id: communityId,
        },
      },
      select: {
        id: true,
        title: true,
        communityId: true,
        content: true,
        contentImageUrl: true,
        likeCount: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getEventByEventId(eventId: number): Promise<EventData | null> {
    return this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        eventCity: {
          select: {
            id: true,
            cityId: true,
          },
        },
        community: {
          select: {
            id: true,
            deletedAt: true,
          },
        },
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async getCommunityById(id: number): Promise<CommunityData | null> {
    return this.prisma.community.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
      },
    });
  }

  async isUserJoinedCommunity(
    userId: number,
    communityId: number
  ): Promise<boolean> {
    const communityExist = await this.prisma.communityJoin.findUnique({
      where: {
        communityId_userId: {
          communityId,
          userId,
        },
        user: {
          deletedAt: null,
        },
      },
    });

    return !!communityExist;
  }

  async joinCommunityWaiting(
    communityId: number,
    userId: number
  ): Promise<void> {
    await this.prisma.communityWaiting.create({
      data: {
        communityId,
        userId,
        status: WaitingStatus.PENDING,
      },
      select: {
        id: true,
        communityId: true,
        userId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateCommunity(
    communityId: number,
    data: UpdateCommunityData
  ): Promise<CommunityData> {
    return this.prisma.community.update({
      where: {
        id: communityId,
      },
      data: {
        name: data.name,
        leadId: data.leadId,
        description: data.description,
        maxPeople: data.maxPeople,
      },
      select: {
        id: true,
        leadId: true,
        name: true,
        description: true,
        maxPeople: true,
      },
    });
  }

  async deleteCommunity(communityId: number): Promise<void> {
    const events = await this.getCommunityEvents(communityId);

    await this.prisma.$transaction([
      ...this.deleteEvent(events.map((event) => event.id)),
      this.prisma.communityJoin.deleteMany({
        where: {
          communityId,
        },
      }),
      this.prisma.communityWaiting.deleteMany({
        where: {
          communityId,
        },
      }),
      this.prisma.community.update({
        where: {
          id: communityId,
        },
        data: {
          deletedAt: new Date(),
        },
      }),
    ]);
  }
  async getCommunityEvents(communityId: number): Promise<EventData[]> {
    return this.prisma.event.findMany({
      where: {
        communityId,
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        eventCity: {
          select: {
            id: true,
            cityId: true,
          },
        },
        community: {
          select: {
            id: true,
            deletedAt: true,
          },
        },
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }
}
