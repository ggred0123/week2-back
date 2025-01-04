export type UpdateCommunityContentData = {
  title?: string;
  content?: string;
  writedUserId?: number;
  contentImageUrl?: string | null;
};

export type UpdateReplyData = {
  content?: string;
};
