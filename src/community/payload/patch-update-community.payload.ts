import { IsDate, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PatchUpdateCommunityContentPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "커뮤니티 글 제목",
    type: String,
  })
  title?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "커뮤니티 글 내용",
    type: String,
  })
  content?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "커뮤니티 글 이미지 URL",
    type: String,
    nullable: true,
  })
  contentImageUrl?: string | null;
}
