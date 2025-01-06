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
exports.AuthRepository = void 0;
const prisma_service_1 = require("../common/services/prisma.service");
const common_1 = require("@nestjs/common");
let AuthRepository = class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(data) {
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
                programmingField: data.programmingField,
                programmingLanguage: data.programmingLanguage,
                programmingLevel: data.programmingLevel,
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
                programmingField: true,
                programmingLanguage: true,
                programmingLevel: true,
            },
        });
    }
    async updateUser(id, data) {
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
                programmingField: data.programmingField,
                programmingLanguage: data.programmingLanguage,
                programmingLevel: data.programmingLevel,
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
                programmingField: true,
                programmingLanguage: true,
                programmingLevel: true,
            },
        });
    }
    async getUserById(id) {
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
                programmingField: true,
                programmingLanguage: true,
                programmingLevel: true,
            },
        });
    }
    async getUserByEmail(email) {
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
                programmingField: true,
                programmingLanguage: true,
                programmingLevel: true,
            },
        });
    }
    async getCategoryById(id) {
        return this.prisma.category.findUnique({
            where: {
                id,
            },
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map