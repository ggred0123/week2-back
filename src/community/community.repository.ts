import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/services/prisma.service";
import {
  CreateCommunityContentData,
  CreateCommunityData,
  CreateReplyData,
} from "./type/create-community-data.type";
import {
  CommunityContentData,
  CommunityData,
  ReplyData,
} from "./type/community-data.type";
import { User, Community, Prisma, PrismaPromise } from "@prisma/client";
import { UpdateCommunityContentData } from "./type/update-community-data.type";
import { filter } from "lodash";
import { PatchUpdateCommunityContentPayload } from "./payload/patch-update-community.payload";
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
    data: CreateCommunityContentData,
    userId: number
  ): Promise<CommunityContentData> {
    return this.prisma.communityContent.create({
      data: {
        communityId: data.communityId,
        title: data.title,
        content: data.content,
        contentImageUrl: data.contentImageUrl,
        writedUserId: userId,
      },
      select: {
        id: true,
        title: true,
        communityId: true,
        writedUserId: true,
        content: true,
        contentImageUrl: true,
        likeCount: true,
        createdAt: true,
        reply: {
          select: {
            id: true,
            userId: true,
            content: true,
          },
        },
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
        writedUserId: true,
        reply: {
          select: {
            id: true,
            userId: true,
            content: true,
          },
        },
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

  async getHotCommunityContents(): Promise<CommunityContentData[]> {
    return this.prisma.communityContent.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        },
      },
      orderBy: {
        likeCount: "desc",
      },
      take: 3,
      select: {
        id: true,
        title: true,
        communityId: true,
        writedUserId: true,
        content: true,
        contentImageUrl: true,
        likeCount: true,
        createdAt: true,
        reply: {
          select: {
            id: true,
            userId: true,
            content: true,
          },
        },
      },
    });
  }

  async getCommunityContentById(
    id: number
  ): Promise<CommunityContentData | null> {
    return this.prisma.communityContent.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        communityId: true,
        writedUserId: true,
        content: true,
        contentImageUrl: true,
        likeCount: true,
        createdAt: true,
        reply: {
          select: {
            id: true,
            userId: true,
            content: true,
          },
        },
      },
    });
  }

  async createReply(data: CreateReplyData): Promise<ReplyData> {
    return this.prisma.reply.create({
      data: {
        communityContentId: data.communityContentId,
        userId: data.userId,
        content: data.content,
      },
      select: {
        id: true,
        communityContentId: true,
        userId: true,
        content: true,
      },
    });
  }

  async patchUpdateCommunityContent(
    communityContentId: number,
    data: UpdateCommunityContentData,
    userId: number
  ): Promise<CommunityContentData> {
    return this.prisma.communityContent.update({
      where: { id: communityContentId, writedUserId: userId },
      data: {
        title: data.title,
        content: data.content,
        contentImageUrl: data.contentImageUrl,
      },
      select: {
        id: true,
        title: true,
        communityId: true,
        writedUserId: true,
        content: true,
        contentImageUrl: true,
        likeCount: true,
        createdAt: true,
        reply: {
          select: {
            id: true,
            userId: true,
            content: true,
          },
        },
      },
    });
  }

  async deleteCommunityContent(communityContentId: number): Promise<void> {
    await this.prisma.communityContent.delete({
      where: { id: communityContentId },
    });
  }

  async deleteReply(replyId: number): Promise<void> {
    await this.prisma.reply.delete({
      where: { id: replyId },
    });
  }
}
