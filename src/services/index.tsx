import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';

import {
  endpoints,
  urls,
} from '../constants';
import {
  CreatePostParams,
  UpdatePostParams,
  Post,
  UpdatePostResponse,
} from '../types';


class APIClient {
  private baseUrl: string;
  private instance: AxiosInstance;

  constructor(baseUrl: string = urls.jsonplaceholderApi) {
    const headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      responseType: 'json',
      timeout: 10000,
      headers,
    });
  }

  public get(endpoint: string, params?: object): Promise<AxiosResponse<any>> {
    return this.instance.get(endpoint, params);
  }

  public post(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> {
    return this.instance.post(endpoint, data, config);
  }

  deletePost = (postId: number): Promise<AxiosResponse<{}>> =>
    this.instance.delete(`${endpoints.posts}/${postId}`);

  getPostDetails = (postId: number): Promise<AxiosResponse<Post>> =>
    this.instance.get(`${endpoints.posts}/${postId}`);

  getAllPosts = (): Promise<AxiosResponse<Array<Post>>> =>
    this.instance.get(endpoints.posts);

  postCreatePost = (
    createPostParams: CreatePostParams,
  ): Promise<AxiosResponse<Post>> =>
    this.instance.post(
      endpoints.posts,
      createPostParams,
    );

  putUpdatePost = (
    postId: number,
    updatePostParams: UpdatePostParams,
  ): Promise<AxiosResponse<UpdatePostResponse>> =>
    this.instance.put(
      `${endpoints.posts}/${postId}`,
      updatePostParams,
    );
}

export default APIClient;
