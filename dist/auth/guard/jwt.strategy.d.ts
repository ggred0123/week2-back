import { ConfigService } from '@nestjs/config';
import { TokenSchema } from '../type/token-schema.type';
import { AuthRepository } from '../auth.repository';
import { UserBaseInfo } from '../type/user-base-info.type';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authRepository;
    private readonly configService;
    constructor(authRepository: AuthRepository, configService: ConfigService);
    validate(data: TokenSchema): Promise<UserBaseInfo>;
}
export {};
