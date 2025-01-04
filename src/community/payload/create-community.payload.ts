import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateCommunityPayload {
  @IsString()
  @ApiProperty({
    description: "클럽 이름",
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
  })
  contentImageUrl?: string | null;
}
