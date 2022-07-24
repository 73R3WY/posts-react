export type UpdatePostParams = {
  title: string;
  body: string;
};

export type CreatePostParams = UpdatePostParams & {
  userId: number;
};

export type Post = CreatePostParams & {
  id: number;
};

export type UpdatePostResponse = UpdatePostParams & {
  id: number;
};
