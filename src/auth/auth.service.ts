import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { SignUpPayload } from "./payload/sign-up.payload";
import { BcryptPasswordService } from "./bcrypt-password.service";
import { SignUpData } from "./type/sign-up-data.type";
import { Tokens } from "./type/tokens.type";
import { TokenService } from "./token.service";
import { LoginPayload } from "./payload/login.payload";
import { ChangePasswordPayload } from "./payload/change-password.payload";
import { UserBaseInfo } from "./type/user-base-info.type";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: BcryptPasswordService,
    private readonly tokenService: TokenService
  ) {}

  async refresh(refreshToken: string): Promise<Tokens> {
    const data = this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.authRepository.getUserById(data.userId);
    if (!user) {
      throw new NotFoundException("존재하지 않는 사용자입니다.");
    }

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException("유효하지 않은 토큰입니다.");
    }

    return this.generateTokens(user.id);
  }

 

  private async generateTokens(userId: number): Promise<Tokens> {
    const tokens = this.tokenService.generateTokens({ userId });

    await this.authRepository.updateUser(userId, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async googleLogin(
    googleUser: any
  ): Promise<{ tokens: Tokens; isNewUser: boolean }> {
    try {
      if (!googleUser?.email) {
        throw new Error("Invalid Google user data");
      }

      const user = await this.authRepository.getUserByEmail(googleUser.email);

      if (user) {
        // 이미 회원가입이 완료된 유저인 경우
        if (user.registrationStatus === "COMPLETED") {
          const tokens = await this.generateTokens(user.id);
          return { tokens, isNewUser: false };
        }
        // 임시 계정인 경우
        const tokens = await this.generateTokens(user.id);
        return { tokens, isNewUser: true };
      }

      const signUpData: SignUpData = {
        email: googleUser.email,
        name: googleUser.name || "Unknown",
        imageUrl: googleUser.imageUrl || null,
        universityId: 1,
        major: "미입력",
        alcoholLevel: 0,
        madCampStatus: "InCamp",
        mbtiId: 1,
        classId: 1,
        sex: "MALE",
        birthday: new Date(),
        registrationStatus: "TEMPORARY",
      };

      const newUser = await this.authRepository.createUser(signUpData);
      const tokens = await this.generateTokens(newUser.id);

      return { tokens, isNewUser: true };
    } catch (error: unknown) {
      console.error("Google login error:", error);
      if (error instanceof Error) {
        throw new Error("Google login failed: " + error.message);
      }
      throw new Error("Google login failed: Unknown error");
    }
  }

  async updateUserProfile(
    userId: number,
    payload: SignUpPayload
  ): Promise<void> {
    const user = await this.authRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    await this.authRepository.updateUser(userId, {
      ...payload,
      registrationStatus: "COMPLETED",
    });
  }

  // 새로운 메소드: 상세 정보 입력 완료 처리
}
