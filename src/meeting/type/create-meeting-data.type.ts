import { StringNullableChain } from "lodash";

export type CreateMeetingData = {
  hostId: number;
  categoryId: number;
  meetingImageUrl: string | null;
  title: string;
  description: string;
  maxPeople: number;
  startTime: Date;
  endTime: Date;
};
