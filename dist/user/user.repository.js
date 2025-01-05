"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_service_1 = require("../common/services/prisma.service");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserById(userId) {
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
    async updateUser(userId, data) {
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
                name: true,
                birthday: true,
            },
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map