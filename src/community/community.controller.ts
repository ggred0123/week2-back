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
import { CommunityDto, CommunityListDto } from "./dto/community.dto";
import {
  CreateCommunityContentPayload,
  CreateCommunityPayload,
  CreateReplyPayload,
} from "./payload/create-community.payload";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UserBaseInfo } from "src/auth/type/user-base-info.type";
import { CurrentUser } from "src/auth/decorator/user.decorator";
import { PatchUpdateCommunityContentPayload } from "./payload/patch-update-community.payload";
import { Community } from "@prisma/client";
import {
  CommunityContentDto,
  CommunityContentListDto,
} from "./dto/communityContent.dto";
import { ReplyDto, ReplyListDto } from "./dto/reply.dto";
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

  @Get(":communityId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "커뮤니티를 조회합니다." })
  @ApiCreatedResponse({ type: CommunityContentListDto })
  async getCommunity(
    @Param("communityId", ParseIntPipe) communityId: number
  ): Promise<CommunityContentListDto> {
    return this.communityService.getCommunityContents(communityId);
  }

  @Get(":communityContentId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "커뮤니티 글을 조회합니다." })
  @ApiCreatedResponse({ type: CommunityContentDto })
  async getCommunityContent(
    @Param("communityContentId", ParseIntPipe) communityContentId: number
  ): Promise<CommunityContentDto> {
    return this.communityService.getCommunityContent(communityContentId);
  }

  @Post(":communityContentId/reply")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "커뮤니티 글의 댓글을 생성합니다." })
  @ApiCreatedResponse({ type: ReplyDto })
  async createReply(
    @Param("communityContentId", ParseIntPipe) communityContentId: number,
    @Body() payload: CreateReplyPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<ReplyDto> {
    return this.communityService.createReply(communityContentId, payload, user);
  }

  @Delete(":communityContentId/reply/:replyId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "커뮤니티 글의 댓글을 삭제합니다." })
  @ApiNoContentResponse()
  async deleteReply(
    @Param("replyId", ParseIntPipe) replyId: number
  ): Promise<void> {
    return this.communityService.deleteReply(replyId);
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

  @Get("communities")
  @ApiOperation({ summary: "커뮤니티를 조회합니다." })
  @ApiCreatedResponse({ type: CommunityListDto })
  async getCommunities(): Promise<CommunityListDto> {
    return this.communityService.getCommunities();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":communityContentId/hotcontent")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "커뮤니티 글을 조회합니다." })
  @ApiCreatedResponse({ type: CommunityContentListDto })
  async getHotCommunityContent(): Promise<CommunityContentListDto> {
    return this.communityService.getHotCommunityContents();
  }

  @Delete(":communityContentId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: "커뮤니티 글을 삭제합니다." })
  @ApiNoContentResponse()
  async deleteCommunity(
    @Param("communityContentId", ParseIntPipe) communityContentId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.communityService.deleteCommunityContent(
      communityContentId,
      user
    );
  }
}
