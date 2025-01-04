export type CreateCommunityData = {
  title: string;
};

export type CreateCommunityContentData = {
  communityId: number;
  title: string;
  writedUserId: number;
  content: string;
  contentImageUrl?: string | null;
};

export type CreateReplyData = {
  communityContentId: number;
  userId: number;
  content: string;
};
