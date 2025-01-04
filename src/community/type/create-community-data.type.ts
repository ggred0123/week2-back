export type CreateCommunityData = {
  title: string;
};

export type CreateCommunityContentData = {
  communityId: number;
  title: string;
  content: string;
  contentImageUrl: string | null;
};

export type CreateReplyData = {
  communityContentId: number;
  userId: number;
  content: string;
};
