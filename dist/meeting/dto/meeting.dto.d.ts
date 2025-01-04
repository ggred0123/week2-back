import { MeetingData } from "../type/meeting-data.type";
export declare class MeetingDto {
    id: number;
    hostId: number;
    categoryId: number;
    meetingImageUrl: string | null;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    maxPeople: number;
    static from(data: MeetingData): MeetingDto;
    static fromArray(data: MeetingData[]): MeetingDto[];
}
export declare class MeetingListDto {
    meetings: MeetingDto[];
    static from(data: MeetingData[]): MeetingListDto;
}
