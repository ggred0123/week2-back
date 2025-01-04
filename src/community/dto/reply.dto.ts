import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  CommunityContentData,
  CommunityData,
  ReplyData,
} from "../type/community-data.type";
import { IsOptional } from "class-validator";

export class ReplyDto {
  @ApiProperty({
    description: "댓글 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "댓글 내용",
    type: String,
  })
  content!: string;

  @ApiProperty({
    description: "댓글 작성자 ID",
    type: Number,
  })
  userId!: number;

  @ApiProperty({
    description: "댓글 작성 커뮤니티 글 ID",
    type: Number,
  })
  communityContentId!: number;

  static from(reply: ReplyData): ReplyDto {
    return {
      id: reply.id,
      content: reply.content,
      userId: reply.userId,
      communityContentId: reply.communityContentId,
    };
  }

  static fromArray(replies: ReplyData[]): ReplyDto[] {
    return replies.map((reply) => ReplyDto.from(reply));
  }
}
export class ReplyListDto {
  @ApiProperty({
    description: "댓글 목록",
    type: [ReplyDto],
  })
  replies!: ReplyDto[];

  static from(replies: ReplyData[]): ReplyListDto {
    return {
      replies: replies.map((reply) => ReplyDto.from(reply)),
    };
  }
}
