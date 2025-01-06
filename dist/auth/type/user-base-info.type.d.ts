import { MadCampStatus } from "@prisma/client";
import { Sex } from "@prisma/client";
import { RegistrationStatus } from "@prisma/client";
export type UserBaseInfo = {
    id: number;
    email: string;
    name: string;
    birthday: Date;
    universityId: number;
    major: string;
    alcoholLevel: number;
    madCampStatus: MadCampStatus;
    mbtiId: number;
    classId: number;
    sex: Sex;
    imageUrl: string | null;
    refreshToken: string | null;
    registrationStatus: RegistrationStatus;
    preferredAlcoholId: number;
    programmingLevel: number;
    programmingField: string;
    programmingLanguage: string;
    leadershipLevel: number;
};
