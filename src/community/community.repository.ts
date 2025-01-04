import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/services/prisma.service";
import { CreateCommunityData } from "./type/create-community-data.type";
import { CommunityData } from "./type/community-data.type";
import {
  User,
  Community,
  CommunityJoin,
  WaitingStatus,
  Prisma,
  PrismaPromise,
} from "@prisma/client";
import { EventData } from "src/event/type/event-data.type";
import { UpdateCommunityData } from "./type/update-community-data.type";
import { filter } from "lodash";
import { CommunityWaitingData } from "./type/community-waiting-data.type";
@Injectable()
export class CommunityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCommunity(data: CreateCommunityData): Promise<CommunityData> {
    return this.prisma.community.create({
      data: {
        leadId: data.leadId,
        name: data.name,
        description: data.description,
        maxPeople: data.maxPeople,
        communityJoin: {
          create: {
            userId: data.leadId,
          },
        },
      },
      select: {
        id: true,
        leadId: true,
        name: true,
        description: true,
        maxPeople: true,
        deletedAt: true,
      },
    });
  }

  outEvent(eventsId: number[], userId: number) {
    return [
      this.prisma.eventJoin.deleteMany({
        where: {
          eventId: {
            in: eventsId,
          },
          userId: userId,
        },
      }),
    ];
  }

  async getMyEvents(userId: number): Promise<EventData[]> {
    return this.prisma.event.findMany({
      where: {
        eventJoin: {
          some: {
            userId: userId,
          },
        },
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

  private deleteEvent(eventsId: number[]) {
    if (eventsId.length === 0) {
      return [];
    }
    return [
      this.prisma.eventJoin.deleteMany({
        where: {
          eventId: {
            in: eventsId,
          },
        },
      }),
      this.prisma.eventCity.deleteMany({
        where: {
          eventId: {
            in: eventsId,
          },
        },
      }),
      this.prisma.event.deleteMany({
        where: {
          id: {
            in: eventsId,
          },
        },
      }),
    ];
  }

  async outCommunity(communityId: number, userId: number): Promise<void> {
    const myEvents = await this.getMyEvents(userId);
    const outevents = myEvents.filter(
      (event) => event.hostId !== userId && event.startTime < new Date()
    );
    const deletedEvents = myEvents.filter(
      (event) => event.hostId === userId && event.startTime < new Date()
    );
    const outeventsId = outevents.map((event) => event.id);
    const deletedEventsId = deletedEvents.map((event) => event.id);

    await this.prisma.$transaction([
      ...this.outEvent(outeventsId, userId),
      ...this.deleteEvent(deletedEventsId),
      this.prisma.communityJoin.delete({
        where: {
          communityId_userId: {
            communityId,
            userId,
          },
        },
      }),
    ]);
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
        deletedAt: null,
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

  async isUserWaitingCommunity(
    userId: number,
    communityId: number
  ): Promise<boolean> {
    const userPending = await this.prisma.communityWaiting.findUnique({
      where: {
        communityId_userId: {
          communityId,
          userId,
        },

        status: WaitingStatus.PENDING,
        user: {
          deletedAt: null,
        },
      },
    });

    return !!userPending;
  }
  async isUserAlreadyRejected(
    userId: number,
    communityId: number
  ): Promise<boolean> {
    const userPending = await this.prisma.communityWaiting.findUnique({
      where: {
        communityId_userId: {
          communityId,
          userId,
        },
        status: WaitingStatus.PENDING,
        user: {
          deletedAt: null,
        },
      },
    });
    return !!userPending;
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

  async approveCommunityJoin(
    communityId: number,
    userId: number
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.communityJoin.create({
        data: {
          communityId,
          userId,
        },
      }),
      this.prisma.communityWaiting.update({
        where: {
          communityId_userId: {
            communityId,
            userId,
          },
        },
        data: {
          status: WaitingStatus.APPROVED,
        },
      }),
    ]);
  }

  async rejectCommunityJoin(
    communityId: number,
    userId: number
  ): Promise<void> {
    await this.prisma.communityWaiting.update({
      where: {
        communityId_userId: {
          communityId,
          userId,
        },
      },
      data: {
        status: WaitingStatus.REJECTED,
      },
    });
  }

  async getCommunityJoinCount(communityId: number): Promise<number> {
    return this.prisma.communityJoin.count({
      where: {
        communityId,
        user: {
          deletedAt: null,
        },
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

  async getCommunityWaitingList(
    communityId: number
  ): Promise<CommunityWaitingData[]> {
    return this.prisma.communityWaiting.findMany({
      where: {
        communityId,
        status: WaitingStatus.PENDING,
        user: {
          deletedAt: null,
        },
      },
      select: {
        id: true,
        userId: true,
        communityId: true,
        status: true,
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
