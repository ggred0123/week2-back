import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CommunityRepository } from "./community.repository";
import {
  CreateCommunityContentPayload,
  CreateCommunityPayload,
  CreateReplyPayload,
} from "./payload/create-community.payload";
import { CommunityDto, CommunityListDto } from "./dto/community.dto";
import {
  CreateCommunityContentData,
  CreateCommunityData,
  CreateReplyData,
} from "./type/create-community-data.type";
import { UserBaseInfo } from "src/auth/type/user-base-info.type";
import { UpdateCommunityContentData } from "./type/update-community-data.type";
import { PatchUpdateCommunityContentPayload } from "./payload/patch-update-community.payload";
import {
  CommunityContentDto,
  CommunityContentListDto,
} from "./dto/communityContent.dto";

import { ReplyDto, ReplyListDto } from "./dto/reply.dto";

@Injectable()
export class CommunityService {
  constructor(private readonly communityRepository: CommunityRepository) {}

  async createCommunity(
    payload: CreateCommunityPayload
  ): Promise<CommunityDto> {
    const createData: CreateCommunityData = {
      title: payload.title,
    };

    const community =
      await this.communityRepository.createCommunity(createData);

    return CommunityDto.from(community);
  }

  async getCommunities(): Promise<CommunityListDto> {
    const communities = await this.communityRepository.getCommunities();
    return CommunityListDto.from(communities);
  }

  async createCommunityContent(
    communityId: number,
    payload: CreateCommunityContentPayload,
    user: UserBaseInfo
  ): Promise<CommunityContentDto> {
    const createData: CreateCommunityContentData = {
      communityId,
      title: payload.title,
      content: payload.content,
      contentImageUrl: payload.contentImageUrl,
      writedUserId: user.id,
    };

    const communityContent =
      await this.communityRepository.createCommunityContent(
        createData,
        user.id
      );

    return CommunityContentDto.from(communityContent);
  }

  async patchUpdateCommunityContent(
    communityContentId: number,
    payload: PatchUpdateCommunityContentPayload,
    user: UserBaseInfo
  ): Promise<CommunityContentDto> {
    if (payload.title === null) {
      throw new BadRequestException("title은 null이 될 수 없습니다.");
    }
    if (payload.content === null) {
      throw new BadRequestException("content은 null이 될 수 없습니다.");
    }
    if (payload.contentImageUrl === null) {
      throw new BadRequestException("contentImageUrl은 null이 될 수 없습니다.");
    }

    await this.checkWriterPermissionOfCommunity(communityContentId, user.id);

    const updateData: UpdateCommunityContentData = {
      title: payload.title,
      content: payload.content,
      contentImageUrl: payload.contentImageUrl,
    };

    const updatedCommunityContent =
      await this.communityRepository.patchUpdateCommunityContent(
        communityContentId,
        updateData,
        user.id
      );

    return CommunityContentDto.from(updatedCommunityContent);
  }

  async getCommunityContents(
    communityId: number
  ): Promise<CommunityContentListDto> {
    const communityContents =
      await this.communityRepository.getCommunityContents(communityId);
    return CommunityContentListDto.from(communityContents);
  }

  async getCommunityContent(
    communityContentId: number
  ): Promise<CommunityContentDto> {
    const communityContent =
      await this.communityRepository.getCommunityContentById(
        communityContentId
      );

    if (communityContent === null) {
      throw new NotFoundException("community가 존재하지 않습니다.");
    }

    return CommunityContentDto.from(communityContent);
  }

  async getHotCommunityContents(): Promise<CommunityContentListDto> {
    const communityContents =
      await this.communityRepository.getHotCommunityContents();
    return CommunityContentListDto.from(communityContents);
  }

  async deleteCommunityContent(
    communityContentId: number,
    user: UserBaseInfo
  ): Promise<void> {
    await this.checkWriterPermissionOfCommunity(communityContentId, user.id);

    await this.communityRepository.deleteCommunityContent(communityContentId);
  }

  async createReply(
    communityContentId: number,
    payload: CreateReplyPayload,
    user: UserBaseInfo
  ): Promise<ReplyDto> {
    const createData: CreateReplyData = {
      communityContentId: communityContentId,
      userId: user.id,
      content: payload.content,
    };

    return this.communityRepository.createReply(createData);
  }

  async deleteReply(replyId: number): Promise<void> {
    await this.communityRepository.deleteReply(replyId);
  }

  private async checkWriterPermissionOfCommunity(
    communityContentId: number,
    userId: number
  ) {
    const communityContent =
      await this.communityRepository.getCommunityContentById(
        communityContentId
      );

    if (!communityContent) {
      throw new NotFoundException("community가 존재하지 않습니다.");
    }

    if (communityContent.writedUserId !== userId) {
      throw new ForbiddenException("작성자가 아닙니다!");
    }
  }
}
