export type UpdateMeetingData = {
  title?: string;
  description?: string;
  categoryId?: number;
  meetingImageUrl?: string;
  startTime?: Date;
  endTime?: Date;
  maxPeople?: number;
  location?: string;
  keyword?: string;
};
