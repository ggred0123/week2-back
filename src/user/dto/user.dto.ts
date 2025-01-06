import { ApiProperty } from "@nestjs/swagger";
import { UserData } from "../type/user-data.type";
import { MadCampStatus, Sex } from "../enum/user.enum";

export class UserDto {
  @ApiProperty({
    description: "유저 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "대학교 ID",
    type: Number,
  })
  universityId!: number;

  @ApiProperty({
    description: "알콜 레벨",
    type: Number,
  })
  alcoholLevel!: number;

  @ApiProperty({
    description: "매드 캠프 재학 여부",
    enum: MadCampStatus,
  })
  madCampStatus!: MadCampStatus;

  @ApiProperty({
    description: "성별",
    enum: Sex,
  })
  sex!: Sex;

  @ApiProperty({
    description: "MBTI ID",
    type: Number,
  })
  mbtiId!: number;

  @ApiProperty({
    description: "분반 ID",
    type: Number,
  })
  classId!: number;

  @ApiProperty({
    description: "유저 이미지 URL",
    type: String,
    nullable: true,
  })
  imageUrl?: string | null;

  @ApiProperty({
    description: "이름",
    type: String,
  })
  name!: string;

  @ApiProperty({
    description: "생일",
    type: Date,
  })
  birthday!: Date;

  @ApiProperty({
    description: "리더십 레벨",
    type: Number,
  })
  leadershipLevel!: number;

  @ApiProperty({
    description: "선호 알콜",
    type: Number,
  })
  preferredAlcoholId!: number;

  @ApiProperty({
    description: "코딩 레벨",
    type: Number,
  })
  programmingLevel!: number;

  @ApiProperty({
    description: "코딩 분야",
    type: String,
  })
  programmingField!: string;

  @ApiProperty({
    description: "코딩 언어",
    type: String,
  })
  programmingLanguage!: string;

  static from(data: UserData): UserDto {
    return {
      id: data.id,
      name: data.name,
      birthday: data.birthday,
      universityId: data.universityId,
      alcoholLevel: data.alcoholLevel,
      madCampStatus: data.madCampStatus,
      sex: data.sex,
      mbtiId: data.mbtiId,
      classId: data.classId,
      imageUrl: data.imageUrl,
      programmingLevel: data.programmingLevel,
      programmingField: data.programmingField,
      programmingLanguage: data.programmingLanguage,
      preferredAlcoholId: data.preferredAlcoholId,
      leadershipLevel: data.leadershipLevel,
    };
  }

  static fromArray(data: UserData[]): UserDto[] {
    return data.map((user) => UserDto.from(user));
  }
}

export class UserListDto {
  @ApiProperty({
    description: "유저 목록",
    type: [UserDto],
  })
  users!: UserDto[];

  static from(data: UserData[]): UserListDto {
    return {
      users: UserDto.fromArray(data),
    };
  }
}
