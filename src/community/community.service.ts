import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CommunityRepository } from "./community.repository";
import { CreateCommunityPayload } from "./payload/create-community.payload";
import { CommunityDto, CommunityListDto } from "./dto/community.dto";
import { CreateCommunityData } from "./type/create-community-data.type";
import { UserBaseInfo } from "src/auth/type/user-base-info.type";
import { UpdateCommunityData } from "./type/update-community-data.type";
import { PatchUpdateCommunityPayload } from "./payload/patch-update-community.payload";
import { ApproveCommunityJoinPayload } from "./payload/approve-community-join.payload";

@Injectable()
export class CommunityService {
  constructor(private readonly communityRepository: CommunityRepository) {}

  async createCommunity(
    payload: CreateCommunityPayload,
    user: UserBaseInfo
  ): Promise<CommunityDto> {
    const createData: CreateCommunityData = {
      leadId: user.id,
      name: payload.name,
      description: payload.description,
      maxPeople: payload.maxPeople,
    };

    const community =
      await this.communityRepository.createCommunity(createData);

    return CommunityDto.from(community);
  }

  async joinCommunity(communityId: number, user: UserBaseInfo): Promise<void> {
    const isUserJoinedCommunity =
      await this.communityRepository.isUserJoinedCommunity(
        user.id,
        communityId
      );

    if (isUserJoinedCommunity) {
      throw new ConflictException("해당 유저가 이미 참가한 클럽입니다.");
    }
    const userWaiting = await this.communityRepository.isUserWaitingCommunity(
      user.id,
      communityId
    );
    if (userWaiting) {
      throw new ConflictException("해당 유저가 이미 참가 신청한 클럽입니다.");
    }
    const isUserRejected = await this.communityRepository.isUserAlreadyRejected(
      user.id,
      communityId
    );
    if (isUserRejected) {
      throw new ConflictException("거절된 클럽에 다시 참가할 수 없습니다.");
    }

    const community =
      await this.communityRepository.getCommunityById(communityId);

    if (!community) {
      throw new NotFoundException("Community가 존재하지 않습니다.");
    }

    await this.communityRepository.joinCommunityWaiting(communityId, user.id);
  }
  async outCommunity(communityId: number, user: UserBaseInfo): Promise<void> {
    const isUserJoinedCommunity =
      await this.communityRepository.isUserJoinedCommunity(
        user.id,
        communityId
      );

    if (!isUserJoinedCommunity) {
      throw new ConflictException("해당 유저가 참가하지 않은 클럽입니다.");
    }

    const community =
      await this.communityRepository.getCommunityById(communityId);
    if (!community) {
      throw new NotFoundException("Community가 존재하지 않습니다.");
    }

    if (community.leadId === user.id) {
      throw new ConflictException("lead는 클럽에서 나갈 수 없습니다.");
    }

    await this.communityRepository.outCommunity(communityId, user.id);
  }

  async approveCommunityJoin(
    communityId: number,
    payload: ApproveCommunityJoinPayload,
    user: UserBaseInfo
  ): Promise<void> {
    await this.checkLeadPermissionOfCommunity(communityId, user.id);

    const IsUserWaitingCommunity =
      await this.communityRepository.isUserWaitingCommunity(
        communityId,
        payload.userId
      );
    if (!IsUserWaitingCommunity) {
      throw new ConflictException("해당 유저가 대기중인 클럽이 아닙니다.");
    }

    if (payload.approve) {
      await this.communityRepository.approveCommunityJoin(
        communityId,
        payload.userId
      );
      return;
    }
    await this.communityRepository.rejectCommunityJoin(
      communityId,
      payload.userId
    );
  }
  async patchUpdateCommunity(
    communityId: number,
    payload: PatchUpdateCommunityPayload,
    user: UserBaseInfo
  ): Promise<CommunityDto> {
    if (payload.name === null) {
      throw new BadRequestException("title은 null이 될 수 없습니다.");
    }
    if (payload.description === null) {
      throw new BadRequestException("description은 null이 될 수 없습니다.");
    }
    if (payload.maxPeople === null) {
      throw new BadRequestException("maxPeople은 null이 될 수 없습니다.");
    }
    if (payload.leadId === null) {
      throw new BadRequestException("leadId는 null이 될 수 없습니다.");
    }

    await this.checkLeadPermissionOfCommunity(communityId, user.id);

    if (payload.leadId) {
      const checkUserInCommunity =
        await this.communityRepository.isUserJoinedCommunity(
          communityId,
          payload.leadId
        );
      if (!checkUserInCommunity) {
        throw new ConflictException(
          "클럽 리드로 지정된 유저가 클럽에 가입되어 있지 않습니다."
        );
      }
    }

    const updateData: UpdateCommunityData = {
      name: payload.name,
      leadId: payload.leadId,
      description: payload.description,
      maxPeople: payload.maxPeople,
    };

    const communityJoinCount =
      await this.communityRepository.getCommunityJoinCount(communityId);

    if (payload.maxPeople && payload.maxPeople < communityJoinCount) {
      throw new ConflictException(
        "정원을 현재 참가자 수보다 작게 수정할 수 없습니다."
      );
    }

    const updatedCommunity = await this.communityRepository.updateCommunity(
      communityId,
      updateData
    );

    return CommunityDto.from(updatedCommunity);
  }
  async deleteCommunity(
    communityId: number,
    user: UserBaseInfo
  ): Promise<void> {
    await this.checkLeadPermissionOfCommunity(communityId, user.id);

    await this.communityRepository.deleteCommunity(communityId);
  }

  private async checkLeadPermissionOfCommunity(
    communityId: number,
    userId: number
  ) {
    const community =
      await this.communityRepository.getCommunityById(communityId);

    if (!community) {
      throw new NotFoundException("community가 존재하지 않습니다.");
    }

    if (community.leadId !== userId) {
      throw new ForbiddenException("리드가 아닙니다!");
    }
  }
}
