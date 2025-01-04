import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateCommunityPayload {
  @IsInt()
  @ApiProperty({
    description: "커뮤니티 이름",
    type: String,
  })
  title!: string;
}

export class CreateCommunityContentPayload {
  @IsString()
  @ApiProperty({
    description: "커뮤니티 글 제목",
    type: String,
  })
  title!: string;

  @IsInt()
  @ApiProperty({
    description: "커뮤니티 글 작성자 ID",
    type: Number,
  })
  writedUserId!: number;

  @IsString()
  @ApiProperty({
    description: "커뮤니티 글 내용",
    type: String,
  })
  content!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "커뮤니티 글 이미지 URL",
    type: String,
    nullable: true,
  })
  contentImageUrl?: string | null;
}

export class CreateReplyPayload {
  @IsInt()
  @ApiProperty({
    description: "댓글 작성자 ID",
    type: Number,
  })
  userId!: number;

  @IsInt()
  @ApiProperty({
    description: "댓글 작성 커뮤니티 글 ID",
    type: Number,
  })
  communityContentId!: number;

  @IsString()
  @ApiProperty({
    description: "댓글 내용",
    type: String,
  })
  content!: string;
}
