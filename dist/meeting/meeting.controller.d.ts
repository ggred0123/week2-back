import { MeetingService } from "./meeting.service";
import { MeetingDto, MeetingListDto } from "./dto/meeting.dto";
import { CreateMeetingPayload } from "./payload/create-meeting.payload";
import { UserBaseInfo } from "../auth/type/user-base-info.type";
import { MeetingQuery } from "./query/meeting.query";
import { PatchUpdateMeetingPayload } from "./payload/patch-update-meeting.payload";
export declare class MeetingController {
    private readonly meetingService;
    constructor(meetingService: MeetingService);
    createMeeting(payload: CreateMeetingPayload, user: UserBaseInfo): Promise<MeetingDto>;
    getMeetings(query: MeetingQuery): Promise<MeetingListDto>;
    getMyMeetings(user: UserBaseInfo): Promise<MeetingListDto>;
    patchUpdateMeeting(meetingId: number, payload: PatchUpdateMeetingPayload, user: UserBaseInfo): Promise<MeetingDto>;
    deleteMeeting(meetingId: number, user: UserBaseInfo): Promise<void>;
    joinMeeting(meetingId: number, user: UserBaseInfo): Promise<void>;
    leaveMeeting(meetingId: number, user: UserBaseInfo): Promise<void>;
}
