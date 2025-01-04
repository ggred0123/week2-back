import { MadCampStatus, PreferredAlcohol, Sex } from "../enum/user.enum";
export type UserData = {
  id: number;
  universityId: number;
  alcoholLevel: number;
  madCampStatus: MadCampStatus;
  preferredAlcohol: {
    alcoholId: number;
  }[];
  sex: Sex;
  mbtiId: number;
  classId: number;
  imageUrl: string | null;
  email: string;
  name: string;
  birthday: Date;
};
