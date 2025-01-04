import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CommunityService } from "./community.service";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CommunityDto } from "./dto/community.dto";
import { CreateCommunityPayload } from "./payload/create-community.payload";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UserBaseInfo } from "src/auth/type/user-base-info.type";
import { CurrentUser } from "src/auth/decorator/user.decorator";
import { ApproveCommunityJoinPayload } from "./payload/approve-community-join.payload";
import { PatchUpdateCommunityPayload } from "./payload/patch-update-community.payload";
import { CommunityWaitingListDto } from "./dto/community-waiting.dto";
import { Community } from "@prisma/client";

@Controller("communities")
@ApiTags("Community API")
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "클럽을 생성합니다" })
  @ApiCreatedResponse({ type: CommunityDto })
  async createCommunity(
    @Body() payload: CreateCommunityPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<CommunityDto> {
    return this.communityService.createCommunity(payload, user);
  }

  @Post(":communityId/join")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "클럽에 참가합니다" })
  @ApiNoContentResponse()
  async joinCommunity(
    @Param("communityId", ParseIntPipe) communityId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.communityService.joinCommunity(communityId, user);
  }

  @Post(":/communityId/approve")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "클럽 참여를 결정합니다." })
  @HttpCode(204)
  @ApiNoContentResponse()
  async approveCommunityJoin(
    @Param("communityId", ParseIntPipe) communityId: number,
    @Body() payload: ApproveCommunityJoinPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.communityService.approveCommunityJoin(
      communityId,
      payload,
      user
    );
  }

  @Post(":communityId/out")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "유저가 community에서 나갑니다." })
  @ApiNoContentResponse()
  async outCommunity(
    @Param("communityId", ParseIntPipe) communityId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.communityService.outCommunity(communityId, user);
  }

  @Patch(":communityId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "클럽을 수정합니다" })
  @ApiOkResponse({ type: CommunityDto })
  async patchUpdateCommunity(
    @Param("communityId", ParseIntPipe) communityId: number,
    @Body() payload: PatchUpdateCommunityPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<CommunityDto> {
    return this.communityService.patchUpdateCommunity(
      communityId,
      payload,
      user
    );
  }
  @Delete(":communityId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: "클럽을 삭제합니다." })
  @ApiNoContentResponse()
  async deleteCommunity(
    @Param("communityId", ParseIntPipe) communityId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.communityService.deleteCommunity(communityId, user);
  }
}
