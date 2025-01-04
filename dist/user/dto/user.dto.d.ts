import { UserData } from "../type/user-data.type";
import { MadCampStatus, Sex } from "../enum/user.enum";
export declare class UserDto {
    id: number;
    universityId: number;
    alcoholLevel: number;
    madCampStatus: MadCampStatus;
    sex: Sex;
    mbtiId: number;
    classId: number;
    imageUrl?: string | null;
    email: string;
    name: string;
    birthday: Date;
    alcoholIds: number[];
    static from(data: UserData): UserDto;
    static fromArray(data: UserData[]): UserDto[];
}
export declare class UserListDto {
    users: UserDto[];
    static from(data: UserData[]): UserListDto;
}
