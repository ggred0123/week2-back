import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenSchema } from './type/token-schema.type';
import { Tokens } from './type/tokens.type';
export declare class TokenService {
    private readonly configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    generateTokens(payload: TokenSchema): Tokens;
    verifyAccessToken(token: string): TokenSchema;
    verifyRefreshToken(token: string): TokenSchema;
    private generateAccessToken;
    private generateRefreshToken;
}
