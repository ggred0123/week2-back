import { AuthService } from "./auth.service";
import { TokenDto } from "./dto/token.dto";
import { SignUpPayload } from "./payload/sign-up.payload";
import { Response, Request } from "express";
import { UserBaseInfo } from "./type/user-base-info.type";
import { LoginPayload } from "./payload/login.payload";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(payload: LoginPayload, res: Response): Promise<TokenDto>;
    completeProfile(payload: SignUpPayload, user: UserBaseInfo, res: Response): Promise<{
        message: string;
    }>;
    refresh(req: Request, res: Response): Promise<TokenDto>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
}
