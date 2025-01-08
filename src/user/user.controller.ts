import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { UpdateUserPayload } from "./payload/update-user.payload";
import { CurrentUser } from "../auth/decorator/user.decorator";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":userId")
  @ApiOperation({ summary: "유저 정보를 가져옵니다" })
  @ApiOkResponse({ type: UserDto })
  async getUserById(@Param("userId") userId: number): Promise<UserDto> {
    return this.userService.getUserById(userId);
  }

  @Patch(":userId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "유저 정보를 수정합니다" })
  @ApiOkResponse({ type: UserDto })
  async updateUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() payload: UpdateUserPayload,
    @CurrentUser() user: UserBaseInfo
  ): Promise<UserDto> {
    return this.userService.updateUser(userId, payload, user);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "내 정보를 가져옵니다" })
  @ApiOkResponse({ type: UserDto })
  async getMe(@CurrentUser() user: UserBaseInfo): Promise<UserDto> {
    console.log("Current User:", user); // 현재 사용자 확인
    try {
      if (!user || !user.id) {
        throw new BadRequestException("유효하지 않은 사용자 정보입니다.");
      }
      return await this.userService.getUserById(user.id);
    } catch (error) {
      console.error("Error in getMe:", error); // 에러 로그 추가
      throw new InternalServerErrorException("서버 내부 오류가 발생했습니다.");
    }
  }
}
