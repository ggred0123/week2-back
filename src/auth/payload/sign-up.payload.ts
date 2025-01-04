import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { MadCampStatus, Sex } from "src/user/enum/user.enum";

export class SignUpPayload {
  @IsEmail()
  @ApiProperty({
    description: "이메일",
    type: String,
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: "비밀번호",
    type: String,
  })
  password!: string;

  @IsString()
  @ApiProperty({
    description: "이름",
    type: String,
  })
  name!: string;

  @IsInt()
  @ApiProperty({
    description: "알콜 레벨",
    type: Number,
  })
  alcoholLevel!: number;

  @IsEnum(MadCampStatus)
  @ApiProperty({
    description: "마드캠 상태",
    enum: MadCampStatus,
  })
  madCampStatus!: MadCampStatus;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: "생년월일",
    type: Date,
  })
  birthday!: Date;

  @IsInt()
  @ApiProperty({
    description: "대학교 ID",
    type: Number,
  })
  universityId!: number;

  @IsString()
  @ApiProperty({
    description: "전공",
    type: String,
  })
  major!: string;

  @IsInt()
  @ApiProperty({
    description: "MBTI ID",
    type: Number,
  })
  mbtiId!: number;

  @IsInt()
  @ApiProperty({
    description: "분반",
    type: Number,
  })
  classId!: number;

  @IsString()
  @ApiProperty({
    description: "성별",
    enum: Sex,
  })
  sex!: Sex;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "이미지 URL",
    type: String,
    nullable: true,
  })
  imageUrl?: string | null;
}
