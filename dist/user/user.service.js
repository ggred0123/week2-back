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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const user_dto_1 = require("./dto/user.dto");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserById(userId) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException("사용자를 찾을 수 없습니다.");
        }
        return user_dto_1.UserDto.from(user);
    }
    async updateUser(userId, payload, user) {
        const data = this.validateNullOf(payload);
        const targetUser = await this.userRepository.getUserById(userId);
        if (!targetUser) {
            throw new common_1.NotFoundException("사용자를 찾을 수 없습니다.");
        }
        if (userId !== user.id) {
            throw new common_1.ForbiddenException("타인의 계정은 수정할 수 없습니다.");
        }
        if (data.email) {
            const isEmailExist = await this.userRepository.isEmailExist(data.email);
            if (isEmailExist) {
                throw new common_1.ConflictException("이미 사용 중인 이메일입니다.");
            }
        }
        const updatedUser = await this.userRepository.updateUser(userId, data);
        return user_dto_1.UserDto.from(updatedUser);
    }
    validateNullOf(payload) {
        if (payload.birthday === null) {
            throw new common_1.BadRequestException("생일은 null이 될 수 없습니다.");
        }
        if (payload.mbtiId === null) {
            throw new common_1.BadRequestException("MBTI ID는 null이 될 수 없습니다.");
        }
        if (payload.classId === null) {
            throw new common_1.BadRequestException("분반 ID는 null이 될 수 없습니다.");
        }
        if (payload.name === null) {
            throw new common_1.BadRequestException("이름은 null이 될 수 없습니다.");
        }
        if (payload.email === null) {
            throw new common_1.BadRequestException("이메일은 null이 될 수 없습니다.");
        }
        if (payload.universityId === null) {
            throw new common_1.BadRequestException("대학 ID는 null이 될 수 없습니다.");
        }
        if (payload.sex === null) {
            throw new common_1.BadRequestException("성별은 null이 될 수 없습니다.");
        }
        if (payload.madCampStatus === null) {
            throw new common_1.BadRequestException("매드 캠프 상태는 null이 될 수 없습니다.");
        }
        if (payload.alcoholLevel === null) {
            throw new common_1.BadRequestException("알콜 레벨은 null이 될 수 없습니다.");
        }
        if (payload.alcoholIds === null) {
            throw new common_1.BadRequestException("알콜 ID는 null이 될 수 없습니다.");
        }
        return {
            email: payload.email,
            name: payload.name,
            birthday: payload.birthday,
            universityId: payload.universityId,
            sex: payload.sex,
            madCampStatus: payload.madCampStatus,
            alcoholLevel: payload.alcoholLevel,
            mbtiId: payload.mbtiId,
            classId: payload.classId,
            imageUrl: payload.imageUrl,
            alcoholIds: payload.alcoholIds,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map