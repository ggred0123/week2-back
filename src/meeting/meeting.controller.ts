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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { MeetingService } from "./meeting.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { MeetingDto, MeetingListDto } from "./dto/meeting.dto";
import { CreateMeetingPayload } from "./payload/create-meeting.payload";
import { CurrentUser } from "../auth/decorator/user.decorator";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
import { MeetingQuery } from "./query/meeting.query";
import { PatchUpdateMeetingPayload } from "./payload/patch-update-meeting.payload";

@Controller("meetings")
@ApiTags("Meeting API")
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "모임 생성" })
  @ApiCreatedResponse({ type: MeetingDto })
  async createMeeting(
    @Body() payload: CreateMeetingPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<MeetingDto> {
    return this.meetingService.createMeeting(payload, user);
  }

  @Get()
  @ApiOperation({ summary: "모임 전체 또는 필터 조회" })
  @ApiOkResponse({ type: MeetingListDto })
  async getMeetings(@Query() query: MeetingQuery): Promise<MeetingListDto> {
    return this.meetingService.getMeetings(query);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "내가 참여한 모임 조회" })
  @ApiOkResponse({ type: MeetingListDto })
  async getMyMeetings(
    @CurrentUser() user: UserBaseInfo
  ): Promise<MeetingListDto> {
    return this.meetingService.getMyMeetings(user);
  }

  @Patch(":meetingId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "모임 수정 (PATCH)" })
  @ApiOkResponse({ type: MeetingDto })
  async patchUpdateMeeting(
    @Param("meetingId", ParseIntPipe) meetingId: number,
    @Body() payload: PatchUpdateMeetingPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<MeetingDto> {
    return this.meetingService.patchUpdateMeeting(meetingId, payload, user);
  }

  @Delete(":meetingId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  async deleteMeeting(
    @Param("meetingId", ParseIntPipe) meetingId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.meetingService.deleteMeeting(meetingId, user);
  }

  @Post(":meetingId/join")
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "모임 참가" })
  @ApiNoContentResponse()
  async joinMeeting(
    @Param("meetingId", ParseIntPipe) meetingId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.meetingService.joinMeeting(meetingId, user);
  }

  @Post(":meetingId/leave")
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "모임 나가기" })
  @ApiNoContentResponse()
  async leaveMeeting(
    @Param("meetingId", ParseIntPipe) meetingId: number,
    @CurrentUser() user: UserBaseInfo
  ): Promise<void> {
    return this.meetingService.leaveMeeting(meetingId, user);
  }
}
