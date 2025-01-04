export const MadCampStatus = {
  InCamp: "InCamp",
  OutCamp: "OutCamp",
} as const;

export type MadCampStatus = (typeof MadCampStatus)[keyof typeof MadCampStatus];

export const Sex = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];

export const PreferredAlcohol = {
  Beer: "Beer",
  Wine: "Wine",
  Cocktail: "Cocktail",
  Mixed: "Mixed",
  Soju: "Soju",
  SoftDrink: "SoftDrink",
  None: "None",
} as const;
