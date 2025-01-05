import { Injectable } from "@nestjs/common";
import { MbtiListDto } from "./dto/extra.dto";
import { UniversityListDto } from "./dto/extra.dto";
import { AlcoholListDto } from "./dto/extra.dto";
import { ExtraRepository } from "./extra.repository";

@Injectable()
export class ExtraService {
  constructor(private readonly extraRepository: ExtraRepository) {}

  async getMbtis(): Promise<MbtiListDto> {
    const mbtis = await this.extraRepository.getMbtis();
    return { mbtis };
  }

  async getUniversities(): Promise<UniversityListDto> {
    const universities = await this.extraRepository.getUniversities();
    return { universities };
  }

  async getAlcohol(): Promise<AlcoholListDto> {
    const alcohols = await this.extraRepository.getAlcohol();
    return { alcohols };
  }
}
