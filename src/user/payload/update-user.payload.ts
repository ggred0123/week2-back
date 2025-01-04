import {
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsArray,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { MadCampStatus, Sex } from "../enum/user.enum";
export class UpdateUserPayload {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: "이메일",
    type: String,
  })
  email?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "이름",
    type: String,
  })
  name?: string | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: "생일",
    type: Date,
    nullable: true,
  })
  birthday?: Date | null;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: "대학 ID",
    type: Number,
  })
  universityId?: number | null;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: "성별",
    enum: Sex,
  })
  sex?: Sex | null;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: "MBTI ID",
    type: Number,
  })
  mbtiId?: number | null;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: "분반 ID",
    type: Number,
  })
  classId?: number | null;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: "알콜 레벨",
    type: Number,
  })
  alcoholLevel?: number | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "유저 이미지 URL",
    type: String,
    nullable: true,
  })
  imageUrl?: string | null;

  @IsOptional()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsArray()
  @ApiPropertyOptional({
    description: "선호 알콜 ID",
    type: [Number],
  })
  alcoholIds?: number[] | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "매드 캠프 상태",
    enum: MadCampStatus,
  })
  madCampStatus?: MadCampStatus | null;
}
