import { MadCampStatus, Sex } from "@prisma/client";

export type SignUpData = {
  universityId: number;
  name: string;
  major: string;
  alcoholLevel: number;
  madCampStatus: MadCampStatus;
  email: string;
  password: string;
  mbtiId: number;
  classId: number;
  sex: Sex;
  birthday: Date;

  imageUrl: string | null;
};
