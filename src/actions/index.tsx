import APIClient from '../services';
import {
  CreatePostParams,
  UpdatePostParams,
} from "../types"

export const deletePost = (postId: number) =>
  new APIClient().deletePost(postId);

export const getPostDetails = (postId: number) =>
  new APIClient().getPostDetails(postId);

export const getAllPosts = () =>
  new APIClient().getAllPosts();

export const postCreatePost = (createPostParams: CreatePostParams) =>
  new APIClient().postCreatePost(createPostParams);

export const putUpdatePost = (
  postId: number,
  updatePostParams: UpdatePostParams,
) => new APIClient().putUpdatePost(postId, updatePostParams);
