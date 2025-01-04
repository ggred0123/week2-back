import { PrismaService } from "../common/services/prisma.service";
import { CreateMeetingData } from "./type/create-meeting-data.type";
import { Category } from "@prisma/client";
import { MeetingQuery } from "./query/meeting.query";
import { MeetingData } from "./type/meeting-data.type";
import { UpdateMeetingData } from "./type/update-meeting-data.type";
export declare class MeetingRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMeeting(data: CreateMeetingData): Promise<MeetingData>;
    updateMeeting(id: number, data: UpdateMeetingData): Promise<MeetingData>;
    deleteMeeting(id: number): Promise<void>;
    findCategoryById(id: number): Promise<Category | null>;
    findMeetingById(id: number): Promise<MeetingData | null>;
    getMeetings(query: MeetingQuery): Promise<MeetingData[]>;
    getMeetingsJoinedBy(userId: number): Promise<MeetingData[]>;
    getParticipantsIds(meetingId: number): Promise<number[]>;
    joinMeeting(meetingId: number, userId: number): Promise<void>;
    leaveMeeting(meetingId: number, userId: number): Promise<void>;
}
