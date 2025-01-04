import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  CommunityContentData,
  CommunityData,
} from "../type/community-data.type";
import { IsOptional } from "class-validator";

export class CommunityContentDto {
  @ApiProperty({
    description: "커뮤니티 글 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "커뮤니티 ID",
    type: Number,
  })
  communityId!: number;

  @ApiProperty({
    description: "커뮤니티 글 제목",
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: "커뮤니티 글 내용",
    type: String,
  })
  content!: string;

  @ApiProperty({
    description: "커뮤니티 글 좋아요 수",
    type: Number,
  })
  likeCount!: number;

  @ApiPropertyOptional({
    description: "커뮤니티 글 이미지 URL",
    type: String,
  })
  contentImageUrl?: string;

  static from(communityContent: CommunityContentData): CommunityContentDto {
    return {
      id: communityContent.id,
      communityId: communityContent.communityId,
      title: communityContent.title,
      content: communityContent.content,
      likeCount: communityContent.likeCount,
      contentImageUrl: communityContent.contentImageUrl,
    };
  }

  static fromArray(
    communityContents: CommunityContentData[]
  ): CommunityContentDto[] {
    return communityContents.map((communityContent) =>
      this.from(communityContent)
    );
  }
}
