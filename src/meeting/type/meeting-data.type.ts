export type MeetingData = {
  id: number;
  hostId: number;
  title: string;
  description: string;
  categoryId: number;
  meetingImageUrl: string | null;
  location: string;
  keyword: string;
  meetingJoinUser: {
    user: {
      id: number;
      name: string;
    };
  }[];
  startTime: Date;
  endTime: Date;
  maxPeople: number;
};
