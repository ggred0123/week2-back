import { ApiProperty } from "@nestjs/swagger";
import { MeetingData } from "../type/meeting-data.type";

export class MeetingDto {
  @ApiProperty({
    description: "모임 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "호스트 ID",
    type: Number,
  })
  hostId!: number;

  @ApiProperty({
    description: "카테고리 ID",
    type: Number,
  })
  categoryId!: number;

  @ApiProperty({
    description: "모임 이미지 URL",
    type: String,
    nullable: true,
  })
  meetingImageUrl!: string | null;

  @ApiProperty({
    description: "이름",
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: "설명",
    type: String,
  })
  description!: string;

  @ApiProperty({
    description: "시작 시간",
    type: Date,
  })
  startTime!: Date;

  @ApiProperty({
    description: "종료 시간",
    type: Date,
  })
  endTime!: Date;

  @ApiProperty({
    description: "최대 인원",
    type: Number,
  })
  maxPeople!: number;

  @ApiProperty({
    description: "위치",
    type: String,
  })
  location!: string;

  @ApiProperty({
    description: "키워드",
    type: String,
  })
  keyword!: string;

  static from(data: MeetingData): MeetingDto {
    return {
      id: data.id,
      hostId: data.hostId,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      meetingImageUrl: data.meetingImageUrl,
      startTime: data.startTime,
      endTime: data.endTime,
      maxPeople: data.maxPeople,
      location: data.location,
      keyword: data.keyword,
    };
  }

  static fromArray(data: MeetingData[]): MeetingDto[] {
    return data.map((meeting) => MeetingDto.from(meeting));
  }
}

export class MeetingListDto {
  @ApiProperty({
    description: "모임 목록",
    type: [MeetingDto],
  })
  meetings!: MeetingDto[];

  static from(data: MeetingData[]): MeetingListDto {
    return {
      meetings: MeetingDto.fromArray(data),
    };
  }
}
