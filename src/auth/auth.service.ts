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

  async signUp(payload: SignUpPayload): Promise<Tokens> {
    const user = await this.authRepository.getUserByEmail(payload.email);
    if (user) {
      throw new ConflictException("이미 사용중인 이메일입니다.");
    }

    const hashedPassword = await this.passwordService.getEncryptPassword(
      payload.password
    );

    const inputData: SignUpData = {
      email: payload.email,
      password: hashedPassword,
      name: payload.name,
      birthday: payload.birthday,
      universityId: payload.universityId,
      major: payload.major,
      alcoholLevel: payload.alcoholLevel,
      madCampStatus: payload.madCampStatus,
      mbtiId: payload.mbtiId,
      classId: payload.classId,
      sex: payload.sex,
      imageUrl: payload.imageUrl ?? null,
    };

    const createdUser = await this.authRepository.createUser(inputData);

    return this.generateTokens(createdUser.id);
  }

  async login(payload: LoginPayload): Promise<Tokens> {
    const user = await this.authRepository.getUserByEmail(payload.email);
    if (!user) {
      throw new NotFoundException("존재하지 않는 이메일입니다.");
    }

    const isPasswordMatch = await this.passwordService.validatePassword(
      payload.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ConflictException("비밀번호가 일치하지 않습니다.");
    }

    return this.generateTokens(user.id);
  }

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

  async changePassword(
    payload: ChangePasswordPayload,
    user: UserBaseInfo
  ): Promise<void> {
    const isValid = await this.passwordService.validatePassword(
      payload.currentPassword,
      user.password
    );

    if (!isValid) {
      throw new UnauthorizedException("현재 비밀번호가 일치하지 않습니다.");
    }

    const hashedPassword = await this.passwordService.getEncryptPassword(
      payload.newPassword
    );

    await this.authRepository.updateUser(user.id, {
      password: hashedPassword,
    });
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
    const user = await this.authRepository.getUserByEmail(googleUser.email);

    if (user) {
      // 기존 사용자면 토큰 생성
      const tokens = await this.generateTokens(user.id);
      return { tokens, isNewUser: false };
    }

    const signUpData: SignUpData = {
      email: googleUser.email,
      password: await this.passwordService.getEncryptPassword(
        Math.random().toString(36) // 임시 비밀번호
      ),
      name: googleUser.name,
      imageUrl: googleUser.imageUrl,
      // 나머지 필수 정보는 기본값으로
      universityId: 1, // 기본값
      major: "미입력",
      alcoholLevel: 0,
      madCampStatus: "InCamp",
      mbtiId: 1,
      classId: 1,
      sex: "MALE",
      birthday: new Date(),
    };

    const newUser = await this.authRepository.createUser(signUpData);
    const tokens = await this.generateTokens(newUser.id);
    return { tokens, isNewUser: true };
  }
}
