import { PrismaService } from "../common/services/prisma.service";
import { Injectable } from "@nestjs/common";
import { Category, User } from "@prisma/client";
import { UpdateUserData } from "../auth/type/update-user-data.type";
import { UserData } from "./type/user-data.type";
import { MadCampStatus } from "@prisma/client";
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: number): Promise<UserData | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        preferredAlcohol: true,
      },
    });
  }

  async updateUser(userId: number, data: UpdateUserData): Promise<UserData> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        birthday: data.birthday,
        sex: data.sex,
        mbtiId: data.mbtiId,
        classId: data.classId,
        imageUrl: data.imageUrl,
        madCampStatus: data.madCampStatus,
        preferredAlcoholId: data.preferredAlcoholId,
        leadershipLevel: data.leadershipLevel,
        programmingLevel : data.programmingLevel,
        programmingField: data.programmingField,
        programmingLanguage: data.programmingLanguage,
      },
      select: {
        id: true,
        preferredAlcoholId: true,
        leadershipLevel: true,
        universityId: true,
        alcoholLevel: true,
        madCampStatus: true,
        sex: true,
        mbtiId: true,
        classId: true,
        imageUrl: true,
        name: true,
        birthday: true,
        programmingLevel : true,
        programmingField: true,
        programmingLanguage:true,
      },
    });
  }
}
