import { AuthRepository } from "./auth.repository";
import { SignUpPayload } from "./payload/sign-up.payload";
import { BcryptPasswordService } from "./bcrypt-password.service";
import { Tokens } from "./type/tokens.type";
import { TokenService } from "./token.service";
export declare class AuthService {
    private readonly authRepository;
    private readonly passwordService;
    private readonly tokenService;
    constructor(authRepository: AuthRepository, passwordService: BcryptPasswordService, tokenService: TokenService);
    refresh(refreshToken: string): Promise<Tokens>;
    private generateTokens;
    googleLogin(googleUser: any): Promise<{
        tokens: Tokens;
        isNewUser: boolean;
    }>;
    updateUserProfile(userId: number, payload: SignUpPayload): Promise<void>;
}
