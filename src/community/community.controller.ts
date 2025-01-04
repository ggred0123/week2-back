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
import {
  CreateCommunityContentPayload,
  CreateCommunityPayload,
} from "./payload/create-community.payload";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UserBaseInfo } from "src/auth/type/user-base-info.type";
import { CurrentUser } from "src/auth/decorator/user.decorator";
import { ApproveCommunityJoinPayload } from "./payload/approve-community-join.payload";
import { PatchUpdateCommunityPayload } from "./payload/patch-update-community.payload";
import { Community } from "@prisma/client";
import { CommunityContentDto } from "./dto/communityContent.dto";

@Controller("communities")
@ApiTags("Community API")
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @ApiOperation({ summary: "커뮤니티를 생성합니다" })
  @ApiCreatedResponse({ type: CommunityDto })
  async createCommunity(
    @Body() payload: CreateCommunityPayload
  ): Promise<CommunityDto> {
    return this.communityService.createCommunity(payload);
  }

  @Post(":communityId/content")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "커뮤니티 글을 생성합니다." })
  @ApiCreatedResponse({ type: CommunityContentDto })
  async createCommunityContent(
    @Param("communityId", ParseIntPipe) communityId: number,
    @Body() payload: CreateCommunityContentPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<CommunityContentDto> {
    return this.communityService.createCommunityContent(
      communityId,
      payload,
      user
    );
  }

  @Delete(":communityContentId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: "커뮤니티 글을 삭제합니다." })
  @ApiNoContentResponse()
  async deleteCommunity(
    @Param("communityContentId", ParseIntPipe) communityId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.communityService.deleteCommunity(communityId, user);
  }
}
