import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { SignUpPayload } from './payload/sign-up.payload';
import { Response, Request } from 'express';
import { LoginPayload } from './payload/login.payload';
import { ChangePasswordPayload } from './payload/change-password.payload';
import { UserBaseInfo } from './type/user-base-info.type';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(payload: SignUpPayload, res: Response): Promise<TokenDto>;
    login(payload: LoginPayload, res: Response): Promise<TokenDto>;
    refresh(req: Request, res: Response): Promise<TokenDto>;
    changePassword(payload: ChangePasswordPayload, user: UserBaseInfo): Promise<void>;
}
