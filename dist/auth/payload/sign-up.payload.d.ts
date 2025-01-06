import { MadCampStatus, Sex } from "src/user/enum/user.enum";
declare enum UserPreferredAlcohol {
    Beer = "Beer",
    Wine = "Wine",
    Cocktail = "Cocktail",
    Mixed = "Mixed",
    Soju = "Soju",
    SoftDrink = "SoftDrink",
    None = "None"
}
export { UserPreferredAlcohol };
export declare class SignUpPayload {
    name: string;
    alcoholLevel: number;
    preferredAlcoholId: number;
    leadershipLevel: number;
    madCampStatus: MadCampStatus;
    birthday: Date;
    universityId: number;
    major: string;
    mbtiId: number;
    classId: number;
    sex: Sex;
    imageUrl?: string | null;
}
