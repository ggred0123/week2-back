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
enum UserPreferredAlcohol {
  Beer = "Beer",
  Wine = "Wine",
  Cocktail = "Cocktail",
  Mixed = "Mixed",
  Soju = "Soju",
  SoftDrink = "SoftDrink",
  None = "None",
}
export { UserPreferredAlcohol };

export class SignUpPayload {
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

  @IsInt()
  @ApiProperty({
    description: "선호 알콜",
    type: Number,
  })
  preferredAlcoholId!: number;

  @IsInt()
  @ApiProperty({
    description: "리더십 레벨",
    type: Number,
  })
  leadershipLevel!: number;

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
