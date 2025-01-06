import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
import { UserDto } from "./dto/user.dto";
import { UpdateUserPayload } from "./payload/update-user.payload";
import { UpdateMeetingData } from "../meeting/type/update-meeting-data.type";
import { UpdateUserData } from "../auth/type/update-user-data.type";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    return UserDto.from(user);
  }

  async updateUser(
    userId: number,
    payload: UpdateUserPayload,
    user: UserBaseInfo
  ): Promise<UserDto> {
    const data = this.validateNullOf(payload);

    const targetUser = await this.userRepository.getUserById(userId);

    if (!targetUser) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    if (userId !== user.id) {
      throw new ForbiddenException("타인의 계정은 수정할 수 없습니다.");
    }

    const updatedUser = await this.userRepository.updateUser(userId, data);

    return UserDto.from(updatedUser);
  }

  private validateNullOf(payload: UpdateUserPayload): UpdateUserData {
    if (payload.birthday === null) {
      throw new BadRequestException("생일은 null이 될 수 없습니다.");
    }

    if (payload.mbtiId === null) {
      throw new BadRequestException("MBTI ID는 null이 될 수 없습니다.");
    }

    if (payload.classId === null) {
      throw new BadRequestException("분반 ID는 null이 될 수 없습니다.");
    }

    if (payload.name === null) {
      throw new BadRequestException("이름은 null이 될 수 없습니다.");
    }

    if (payload.email === null) {
      throw new BadRequestException("이메일은 null이 될 수 없습니다.");
    }

    if (payload.universityId === null) {
      throw new BadRequestException("대학 ID는 null이 될 수 없습니다.");
    }
    if (payload.sex === null) {
      throw new BadRequestException("성별은 null이 될 수 없습니다.");
    }

    if (payload.madCampStatus === null) {
      throw new BadRequestException("매드 캠프 상태는 null이 될 수 없습니다.");
    }

    if (payload.alcoholLevel === null) {
      throw new BadRequestException("알콜 레벨은 null이 될 수 없습니다.");
    }

    if (payload.preferredAlcoholId === null) {
      throw new BadRequestException("선호 알콜 ID는 null이 될 수 없습니다.");
    }

    if (payload.leadershipLevel === null) {
      throw new BadRequestException("리더십 레벨은 null이 될 수 없습니다.");
    }

    if (payload.programmingLevel === null) {
      throw new BadRequestException("코딩 레벨은 null이 될 수 없습니다.");
    }

    if (payload.programmingField === null) {
      throw new BadRequestException("코딩 분야는 null이 될 수 없습니다.");
    }

    if (payload.programmingLanguage === null) {
      throw new BadRequestException("코딩 언어는는 null이 될 수 없습니다.");
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
      preferredAlcoholId: payload.preferredAlcoholId,
      leadershipLevel: payload.leadershipLevel,
      programmingLevel : payload.programmingLevel,
      programmingField: payload.programmingField,
      programmingLanguage: payload.programmingLanguage,
    };
  }
}
