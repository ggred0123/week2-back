import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  Get,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { TokenDto } from "./dto/token.dto";
import { SignUpPayload } from "./payload/sign-up.payload";
import { Response, Request } from "express";
import { ChangePasswordPayload } from "./payload/change-password.payload";
import { CurrentUser } from "./decorator/user.decorator";
import { UserBaseInfo } from "./type/user-base-info.type";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { LoginPayload } from "./payload/login.payload";
@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "로그인" })
  @ApiOkResponse({ type: TokenDto })
  async login(
    @Body() payload: LoginPayload,
    @Res({ passthrough: true }) res: Response
  ): Promise<TokenDto> {
    const tokens = await this.authService.login(payload);

    // refresh Token은 쿠키로
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // 이후 실제 도메인으로 변경
      domain: "localhost",
    });

    return TokenDto.from(tokens.accessToken);
  }

  @Put("complete-profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "구글 로그인 후 추가 정보 입력" })
  async completeProfile(
    @Body() payload: SignUpPayload,
    @CurrentUser() user: UserBaseInfo,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      await this.authService.updateUserProfile(user.id, payload);
      return { message: "프로필 업데이트 완료" };
    } catch (error) {
      console.error("Error completing profile:", error);
      throw error;
    }
  }

  @Post("refresh")
  @HttpCode(200)
  @ApiOperation({ summary: "토큰 갱신" })
  @ApiOkResponse({ type: TokenDto })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<TokenDto> {
    const tokens = await this.authService.refresh(req.cookies["refreshToken"]);

    // refresh Token은 쿠키로
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return TokenDto.from(tokens.accessToken);
  }

  // auth.controller.ts에 추가
  @Get("google")
  @ApiOperation({ summary: "구글 로그인" })
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    // 구글 로그인 페이지로 리다이렉트
  }

  @Get("google/callback")
  @ApiOperation({ summary: "구글 로그인 콜백" })
  @UseGuards(AuthGuard("google"))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      console.log("Google User Data:", req.user);
      if (!req.user) {
        throw new Error("Google OAuth 인증 실패: 사용자 데이터가 없습니다.");
      }

      const { tokens, isNewUser } = await this.authService.googleLogin(
        req.user
      );

      console.log("Generated Tokens:", tokens);
      console.log("Is New User:", isNewUser);

      // refreshToken을 쿠키에 설정
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        domain: "localhost",
      });

      // 프론트엔드 URL을 직접 지정
      const frontendURL = "http://localhost:3000"; // 수정된 부분

      return res.redirect(
        `${frontendURL}/auth/google/callback?accessToken=${tokens.accessToken}&isNewUser=${isNewUser}`
      );
    } catch (error) {
      console.error("Error in Google Auth Callback:", error);
      return res.redirect("http://localhost:3000/error");
    }
  }
}
