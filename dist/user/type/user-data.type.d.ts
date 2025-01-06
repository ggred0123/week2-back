import { MadCampStatus, Sex } from "../enum/user.enum";
export type UserData = {
    id: number;
    universityId: number;
    alcoholLevel: number;
    madCampStatus: MadCampStatus;
    preferredAlcoholId: number;
    sex: Sex;
    mbtiId: number;
    classId: number;
    imageUrl: string | null;
    name: string;
    birthday: Date;
    leadershipLevel: number;
};
