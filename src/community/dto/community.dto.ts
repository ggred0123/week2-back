import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CommunityData } from "../type/community-data.type";
import { IsOptional } from "class-validator";

export class CommunityDto {
  @ApiProperty({
    description: "커뮤니티 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "커뮤니티 제목",
    type: String,
  })
  title!: string;

  static from(club: CommunityData): CommunityDto {
    return {
      leadId: club.leadId,
      id: club.id,
      name: club.name,
      description: club.description,
      maxPeople: club.maxPeople,
    };
  }

  static fromArray(Communities: CommunityData[]): CommunityDto[] {
    return Communities.map((Community) => this.from(Community));
  }
}

export class CommunityListDto {
  @ApiProperty({
    description: "모임 목록",
    type: [CommunityDto],
  })
  Communities!: CommunityDto[];

  static from(Communities: CommunityData[]): CommunityListDto {
    return {
      Communities: CommunityDto.fromArray(Communities),
    };
  }
}
