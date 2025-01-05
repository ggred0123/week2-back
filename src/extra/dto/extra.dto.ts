import { ApiProperty } from "@nestjs/swagger";
import { Alcohol } from "@prisma/client";
import { Mbti } from "@prisma/client";
import { University } from "@prisma/client";
import { AlcoholData, MbtiData, UniversityData } from "../type/extra.type";

export class MbtiDto {
  @ApiProperty({
    description: "MBTI ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "MBTI 이름",
    type: String,
  })
  name!: string;

  static from(mbti: MbtiData): MbtiDto {
    return {
      id: mbti.id,
      name: mbti.name,
    };
  }
  static fromList(mbti: MbtiData[]): MbtiDto[] {
    return mbti.map((mbti) => this.from(mbti));
  }
}
export class MbtiListDto {
  @ApiProperty({
    description: "MBTI 정보들",
    type: [MbtiDto],
  })
  mbtis!: MbtiDto[];
}

export class AlcoholDto {
  @ApiProperty({
    description: "알콜 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "알콜 이름",
    type: String,
  })
  name!: string;

  static from(alcohol: AlcoholData): AlcoholDto {
    return {
      id: alcohol.id,
      name: alcohol.name,
    };
  }
  static fromList(alcohol: AlcoholData[]): AlcoholDto[] {
    return alcohol.map((alcohol) => this.from(alcohol));
  }
}

export class AlcoholListDto {
  @ApiProperty({
    description: "알콜 정보들",
    type: [AlcoholDto],
  })
  alcohols!: AlcoholDto[];
}

export class UniversityDto {
  @ApiProperty({
    description: "대학교 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "대학교 이름",
    type: String,
  })
  name!: string;

  static from(university: UniversityData): UniversityDto {
    return {
      id: university.id,
      name: university.name,
    };
  }
  static fromList(university: UniversityData[]): UniversityDto[] {
    return university.map((university) => this.from(university));
  }
}

export class UniversityListDto {
  @ApiProperty({
    description: "대학교 정보들",
    type: [UniversityDto],
  })
  universities!: UniversityDto[];
}
