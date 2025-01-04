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
    type: String,
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
    description: "유저 이메일",
    type: String,
  })
  email!: string;

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
    description: "선호 알콜",
    type: [Number],
  })
  alcoholIds!: number[];

  static from(data: UserData): UserDto {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      birthday: data.birthday,
      universityId: data.universityId,
      alcoholLevel: data.alcoholLevel,
      madCampStatus: data.madCampStatus,
      sex: data.sex,
      mbtiId: data.mbtiId,
      classId: data.classId,
      imageUrl: data.imageUrl,
      alcoholIds: data.preferredAlcohol.map((alcohol) => alcohol.alcoholId),
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
