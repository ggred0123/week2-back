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
        preferredAlcohol: {
          select: {
            alcoholId: true,
          },
        },
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
        email: data.email,
        birthday: data.birthday,
        sex: data.sex,
        mbtiId: data.mbtiId,
        classId: data.classId,
        imageUrl: data.imageUrl,
        madCampStatus: data.madCampStatus,
        preferredAlcohol: data.alcoholIds
          ? {
              deleteMany: {},
              createMany: {
                data: data.alcoholIds.map((alcoholId) => ({
                  alcoholId,
                })),
              },
            }
          : undefined,
      },
      select: {
        id: true,
        preferredAlcohol: {
          select: {
            alcoholId: true,
          },
        },
        universityId: true,
        alcoholLevel: true,
        madCampStatus: true,
        sex: true,
        mbtiId: true,
        classId: true,
        imageUrl: true,
        email: true,
        name: true,
        birthday: true,
      },
    });
  }

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return !!user;
  }
}
