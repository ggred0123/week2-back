import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMeetingPayload } from "./payload/create-meeting.payload";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
import { MeetingDto, MeetingListDto } from "./dto/meeting.dto";
import { CreateMeetingData } from "./type/create-meeting-data.type";
import { MeetingRepository } from "./meeting.repository";
import { MeetingQuery } from "./query/meeting.query";
import { MeetingDetailDto } from "./dto/meeting-detail.dto";
import { PutUpdateMeetingPayload } from "./payload/put-update-meeting.payload";
import { UpdateMeetingData } from "./type/update-meeting-data.type";
import { PatchUpdateMeetingPayload } from "./payload/patch-update-meeting.payload";

@Injectable()
export class MeetingService {
  constructor(private readonly meetingRepository: MeetingRepository) {}

  async createMeeting(
    payload: CreateMeetingPayload,
    user: UserBaseInfo
  ): Promise<MeetingDto> {
    const [category, cities] = await Promise.all([
      this.meetingRepository.findCategoryById(payload.categoryId),
      this.meetingRepository.findCitiesByIds(payload.cityIds),
    ]);

    if (!category) {
      throw new NotFoundException("카테고리를 찾을 수 없습니다.");
    }

    if (cities.length !== payload.cityIds.length) {
      throw new NotFoundException("도시를 찾을 수 없습니다.");
    }

    if (payload.startTime >= payload.endTime) {
      throw new BadRequestException("시작 시간은 종료 시간보다 빨라야 합니다 ");
    }

    if (payload.startTime < new Date()) {
      throw new BadRequestException(
        "모임 시작 시간은 현재 시간 이후여야 합니다."
      );
    }

    const data: CreateMeetingData = {
      hostId: user.id,
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      cityIds: payload.cityIds,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxPeople: payload.maxPeople,
    };

    const meeting = await this.meetingRepository.createMeeting(data);

    return MeetingDto.from(meeting);
  }

  async getMeetings(query: MeetingQuery): Promise<MeetingListDto> {
    const meetings = await this.meetingRepository.getMeetings(query);

    return MeetingListDto.from(meetings);
  }

  async getMyMeetings(user: UserBaseInfo): Promise<MeetingListDto> {
    const meetings = await this.meetingRepository.getMeetingsJoinedBy(user.id);

    return MeetingListDto.from(meetings);
  }

  async getMeetingById(meetingId: number): Promise<MeetingDetailDto> {
    const meeting =
      await this.meetingRepository.findMeetingDetailById(meetingId);

    if (!meeting) {
      throw new NotFoundException("모임을 찾을 수 없습니다.");
    }

    return MeetingDetailDto.from(meeting);
  }

  async putUpdateMeeting(
    meetingId: number,
    payload: PutUpdateMeetingPayload,
    user: UserBaseInfo
  ): Promise<MeetingDto> {
    const meeting = await this.meetingRepository.findMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundException("모임을 찾을 수 없습니다.");
    }

    if (meeting.hostId !== user.id) {
      throw new ForbiddenException("모임 주최자만 수정할 수 있습니다");
    }

    if (payload.startTime >= payload.endTime) {
      throw new BadRequestException("시작 시간은 종료 시간보다 빨라야 합니다.");
    }

    if (payload.startTime < new Date()) {
      throw new BadRequestException(
        "모임 시작 시간은 현재 시간 이후여야 합니다."
      );
    }

    const [category, cities] = await Promise.all([
      this.meetingRepository.findCategoryById(payload.categoryId),
      this.meetingRepository.findCitiesByIds(payload.cityIds),
    ]);

    if (!category) {
      throw new NotFoundException("카테고리를 찾을 수 없습니다.");
    }

    if (cities.length !== payload.cityIds.length) {
      throw new NotFoundException("도시를 찾을 수 없습니다.");
    }

    const data: UpdateMeetingData = {
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      cityIds: payload.cityIds,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxPeople: payload.maxPeople,
    };

    const updatedMeeting = await this.meetingRepository.updateMeeting(
      meetingId,
      data
    );

    return MeetingDto.from(updatedMeeting);
  }

  async patchUpdateMeeting(
    meetingId: number,
    payload: PatchUpdateMeetingPayload,
    user: UserBaseInfo
  ): Promise<MeetingDto> {
    const data = this.validateNullOf(payload);

    const meeting = await this.meetingRepository.findMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundException("모임을 찾을 수 없습니다.");
    }

    if (meeting.hostId !== user.id) {
      throw new ForbiddenException("모임 주최자만 수정할 수 있습니다");
    }

    const startTime = payload.startTime ?? meeting.startTime;
    const endTime = payload.endTime ?? meeting.endTime;

    if (startTime >= endTime) {
      throw new BadRequestException("시작 시간은 종료 시간보다 빨라야 합니다.");
    }

    if (startTime < new Date()) {
      throw new BadRequestException(
        "모임 시작 시간은 현재 시간 이후여야 합니다."
      );
    }

    if (payload.categoryId) {
      const category = await this.meetingRepository.findCategoryById(
        payload.categoryId
      );
      if (!category) {
        throw new NotFoundException("카테고리를 찾을 수 없습니다.");
      }
    }

    if (payload.cityIds) {
      const cities = await this.meetingRepository.findCitiesByIds(
        payload.cityIds
      );
      if (cities.length !== payload.cityIds.length) {
        throw new NotFoundException("도시를 찾을 수 없습니다.");
      }
    }

    if (payload.maxPeople) {
      const participantsIds =
        await this.meetingRepository.getParticipantsIds(meetingId);

      if (participantsIds.length > payload.maxPeople) {
        throw new ConflictException(
          "현재 참가 인원보다 적은 수로 변경할 수 없습니다."
        );
      }
    }

    const updatedMeeting = await this.meetingRepository.updateMeeting(
      meetingId,
      data
    );

    return MeetingDto.from(updatedMeeting);
  }

  async deleteMeeting(meetingId: number, user: UserBaseInfo): Promise<void> {
    const meeting = await this.meetingRepository.findMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundException("모임을 찾을 수 없습니다.");
    }

    if (meeting.hostId !== user.id) {
      throw new ForbiddenException("모임 주최자만 삭제할 수 있습니다.");
    }

    await this.meetingRepository.deleteMeeting(meetingId);
  }

  async joinMeeting(meetingId: number, user: UserBaseInfo): Promise<void> {
    const meeting = await this.meetingRepository.findMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundException("모임을 찾을 수 없습니다.");
    }

    if (meeting.startTime < new Date()) {
      throw new ConflictException("이미 시작된 모임에 참여할 수 없습니다.");
    }

    const participantsIds =
      await this.meetingRepository.getParticipantsIds(meetingId);

    if (participantsIds.includes(user.id)) {
      throw new ConflictException("이미 참여한 모임입니다.");
    }

    if (participantsIds.length >= meeting.maxPeople) {
      throw new ConflictException("인원이 가득 찼습니다.");
    }

    await this.meetingRepository.joinMeeting(meetingId, user.id);
  }

  async leaveMeeting(meetingId: number, user: UserBaseInfo): Promise<void> {
    const meeting = await this.meetingRepository.findMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundException("모임을 찾을 수 없습니다.");
    }

    if (meeting.hostId === user.id) {
      throw new ConflictException("모임 주최자는 모임에서 나갈 수 없습니다.");
    }

    if (meeting.startTime < new Date()) {
      throw new ConflictException("이미 시작된 모임에서 나갈 수 없습니다.");
    }

    const participantsIds =
      await this.meetingRepository.getParticipantsIds(meetingId);

    if (!participantsIds.includes(user.id)) {
      throw new ConflictException("참여하지 않은 모임입니다.");
    }

    await this.meetingRepository.leaveMeeting(meetingId, user.id);
  }

  private validateNullOf(
    payload: PatchUpdateMeetingPayload
  ): UpdateMeetingData {
    if (payload.title === null) {
      throw new BadRequestException("title은 null이 될 수 없습니다.");
    }

    if (payload.description === null) {
      throw new BadRequestException("description은 null이 될 수 없습니다.");
    }

    if (payload.categoryId === null) {
      throw new BadRequestException("categoryId는 null이 될 수 없습니다.");
    }

    if (payload.cityIds === null) {
      throw new BadRequestException("cityIds는 null이 될 수 없습니다.");
    }

    if (payload.startTime === null) {
      throw new BadRequestException("startTime은 null이 될 수 없습���다.");
    }

    if (payload.endTime === null) {
      throw new BadRequestException("endTime은 null이 될 수 없습니다.");
    }

    if (payload.maxPeople === null) {
      throw new BadRequestException("maxPeople은 null이 될 수 없습니다.");
    }

    return {
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      cityIds: payload.cityIds,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxPeople: payload.maxPeople,
    };
  }
}
