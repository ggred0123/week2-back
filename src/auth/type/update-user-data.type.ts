import { MadCampStatus, Sex } from "src/user/enum/user.enum";

export type UpdateUserData = {
  email?: string;
  password?: string;
  name?: string;
  universityId?: number;
  major?: string;
  birthday?: Date;
  classId?: number;
  mbtiId?: number;
  sex?: Sex;
  alcoholIds?: number[];
  madCampStatus?: MadCampStatus;
  alcoholLevel?: number;
  imageUrl?: string | null;
  refreshToken?: string | null;
};
