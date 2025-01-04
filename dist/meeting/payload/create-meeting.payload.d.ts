export declare class CreateMeetingPayload {
    hostId: number;
    title: string;
    description: string;
    categoryId: number;
    meetingImageUrl?: string | null;
    startTime: Date;
    endTime: Date;
    maxPeople: number;
    location: string;
    keyword: string;
}
