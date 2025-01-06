import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginPayload {
  @IsEmail()
  @ApiProperty({
    description: "이메일",
    type: String,
  })
  email!: string;
}
