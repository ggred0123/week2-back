import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
      passReqToCallback: true, // 추가
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    try {
      const { emails, name, photos } = profile;

      const user = {
        email: emails[0].value,
        name: name.givenName + (name.familyName ? ` ${name.familyName}` : ""),
        imageUrl: photos[0].value,
      };

      console.log("Google Strategy Validate - User:", user); // 디버깅용
      done(null, user);
    } catch (err) {
      console.error("Google Strategy Validate Error:", err); // 디버깅용
      done(err, null);
    }
  }
}
