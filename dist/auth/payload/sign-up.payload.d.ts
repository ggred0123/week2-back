import { MadCampStatus, Sex } from "src/user/enum/user.enum";
export declare class SignUpPayload {
    email: string;
    password: string;
    name: string;
    alcoholLevel: number;
    madCampStatus: MadCampStatus;
    birthday: Date;
    universityId: number;
    major: string;
    mbtiId: number;
    classId: number;
    sex: Sex;
    imageUrl?: string | null;
}