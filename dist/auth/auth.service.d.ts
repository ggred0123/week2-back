import { AuthRepository } from "./auth.repository";
import { SignUpPayload } from "./payload/sign-up.payload";
import { BcryptPasswordService } from "./bcrypt-password.service";
import { Tokens } from "./type/tokens.type";
import { TokenService } from "./token.service";
import { LoginPayload } from "./payload/login.payload";
import { ChangePasswordPayload } from "./payload/change-password.payload";
import { UserBaseInfo } from "./type/user-base-info.type";
export declare class AuthService {
    private readonly authRepository;
    private readonly passwordService;
    private readonly tokenService;
    constructor(authRepository: AuthRepository, passwordService: BcryptPasswordService, tokenService: TokenService);
    signUp(payload: SignUpPayload): Promise<Tokens>;
    login(payload: LoginPayload): Promise<Tokens>;
    refresh(refreshToken: string): Promise<Tokens>;
    changePassword(payload: ChangePasswordPayload, user: UserBaseInfo): Promise<void>;
    private generateTokens;
    googleLogin(googleUser: any): Promise<{
        tokens: Tokens;
        isNewUser: boolean;
    }>;
}
