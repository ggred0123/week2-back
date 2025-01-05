import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { UniversityListDto } from "./dto/extra.dto";
import { AlcoholListDto } from "./dto/extra.dto";
import { MbtiListDto } from "./dto/extra.dto";
import { MbtiData } from "./type/extra.type";
import { UniversityData } from "./type/extra.type";
import { AlcoholData } from "./type/extra.type";

@Injectable()
export class ExtraRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMbtis(): Promise<MbtiData[]> {
    return this.prisma.mbti.findMany();
  }

  async getUniversities(): Promise<UniversityData[]> {
    return this.prisma.university.findMany();
  }

  async getAlcohol(): Promise<AlcoholData[]> {
    return this.prisma.alcohol.findMany();
  }
}
