import { PrismaService } from "../common/services/prisma.service";
import { Injectable } from "@nestjs/common";
import { UserBaseInfo } from "./type/user-base-info.type";
import { Category } from "@prisma/client";
import { SignUpData } from "./type/sign-up-data.type";
import { UpdateUserData } from "./type/update-user-data.type";

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: SignUpData): Promise<UserBaseInfo> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        birthday: data.birthday,
        universityId: data.universityId,
        major: data.major,
        alcoholLevel: data.alcoholLevel,
        madCampStatus: data.madCampStatus,
        mbtiId: data.mbtiId,
        classId: data.classId,
        sex: data.sex,
        imageUrl: data.imageUrl,
        registrationStatus: data.registrationStatus,
        preferredAlcoholId: data.preferredAlcoholId,
        leadershipLevel: data.leadershipLevel,
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthday: true,
        universityId: true,
        major: true,
        alcoholLevel: true,
        madCampStatus: true,
        mbtiId: true,
        classId: true,
        sex: true,
        imageUrl: true,
        refreshToken: true,
        registrationStatus: true,
        preferredAlcoholId: true,
        leadershipLevel: true,
      },
    });
  }

  async updateUser(id: number, data: UpdateUserData): Promise<UserBaseInfo> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        birthday: data.birthday,
        universityId: data.universityId,
        major: data.major,
        alcoholLevel: data.alcoholLevel,
        madCampStatus: data.madCampStatus,
        mbtiId: data.mbtiId,
        classId: data.classId,
        sex: data.sex,
        imageUrl: data.imageUrl,
        refreshToken: data.refreshToken,
        registrationStatus: data.registrationStatus,
        preferredAlcoholId: data.preferredAlcoholId,
        leadershipLevel: data.leadershipLevel,
      },
      select: {
        id: true,
        email: true,
        name: true,
        birthday: true,
        universityId: true,
        major: true,
        alcoholLevel: true,
        madCampStatus: true,
        mbtiId: true,
        classId: true,
        sex: true,
        imageUrl: true,
        refreshToken: true,
        registrationStatus: true,
        preferredAlcoholId: true,
        leadershipLevel: true,
      },
    });
  }

  async getUserById(id: number): Promise<UserBaseInfo | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        birthday: true,
        universityId: true,
        major: true,
        alcoholLevel: true,
        madCampStatus: true,
        mbtiId: true,
        classId: true,
        sex: true,
        imageUrl: true,
        refreshToken: true,
        registrationStatus: true,
        preferredAlcoholId: true,
        leadershipLevel: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserBaseInfo | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        birthday: true,
        universityId: true,
        major: true,
        alcoholLevel: true,
        madCampStatus: true,
        mbtiId: true,
        classId: true,
        sex: true,
        imageUrl: true,
        refreshToken: true,
        registrationStatus: true,
        preferredAlcoholId: true,
        leadershipLevel: true,
      },
    });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }
}
