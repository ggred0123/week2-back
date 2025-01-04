export type CommunityData = {
  id: number;
  title: string;
};

export type CommunityContentData = {
  id: number;
  communityId: number;
  title: string;
  content: string;
  likeCount: number;
  contentImageUrl: string | null;
  writedUserId: number;
  reply: {
    id: number;
    userId: number;
    content: string;
  }[];
};

export type ReplyData = {
  id: number;
  communityContentId: number;
  userId: number;
  content: string;
};
