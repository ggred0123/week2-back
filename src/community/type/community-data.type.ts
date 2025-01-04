export type CommunityData = {
  id: number;
  title: string;
  maxPeople: number;
};

export type CommunityContentData = {
  id: number;
  communityId: number;
  title: string;
  content: string;
  likeCount: number;
  contentImageUrl: string;
};

export type ReplyData = {
  id: number;
  communityContentId: number;
  userId: number;
  content: string;
};
