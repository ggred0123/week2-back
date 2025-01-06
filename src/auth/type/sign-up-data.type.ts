import { MadCampStatus, Sex, RegistrationStatus } from "@prisma/client";

export type SignUpData = {
  universityId: number;
  name: string;
  major: string;
  alcoholLevel: number;
  madCampStatus: MadCampStatus;
  mbtiId: number;
  classId: number;
  sex: Sex;
  birthday: Date;
  registrationStatus: RegistrationStatus;
  imageUrl: string | null;
  email: string;
  preferredAlcoholId: number;
  programmingLevel: number;
  programmingField: string;
  programmingLanguage: string; 
  leadershipLevel: number;
};
