import { MadCampStatus, Sex } from "../enum/user.enum";
export declare class UpdateUserPayload {
    email?: string | null;
    name?: string | null;
    birthday?: Date | null;
    universityId?: number | null;
    sex?: Sex | null;
    mbtiId?: number | null;
    classId?: number | null;
    alcoholLevel?: number | null;
    imageUrl?: string | null;
    preferredAlcoholId?: number | null;
    leadershipLevel?: number | null;
    madCampStatus?: MadCampStatus | null;
}
