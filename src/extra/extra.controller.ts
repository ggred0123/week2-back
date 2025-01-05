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
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { CurrentUser } from "../auth/decorator/user.decorator";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
import {
  AlcoholDto,
  MbtiDto,
  UniversityDto,
  MbtiListDto,
  UniversityListDto,
  AlcoholListDto,
} from "./dto/extra.dto";
import { ExtraService } from "./extra.services";
@Controller("extras")
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Get("mbtis")
  @ApiOperation({ summary: "MBTI 정보들을 가져옵니다" })
  @ApiOkResponse({ type: MbtiListDto })
  async getMbtis(): Promise<MbtiListDto> {
    return this.extraService.getMbtis();
  }

  @Get("universities")
  @ApiOperation({ summary: "대학교 정보들을 가져옵니다" })
  @ApiOkResponse({ type: UniversityListDto })
  async getUniversities(): Promise<UniversityListDto> {
    return this.extraService.getUniversities();
  }

  @Get("alcohols")
  @ApiOperation({ summary: "알콜 정보들을 가져옵니다" })
  @ApiOkResponse({ type: AlcoholListDto })
  async getAlcohol(): Promise<AlcoholListDto> {
    return this.extraService.getAlcohol();
  }
}
