import axios from "axios";
import { POST_API } from "../config/api";

export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postService = {
  getPost(page?: number, limit?: number) {
    return axios.get<PostData[]>(POST_API, {
      params: {
        _page: page,
        _limit: limit,
      },
    });
  },
  getAllPost() {
    return axios.get<PostData[]>(POST_API);
  },
  addPost(newPost: Omit<PostData, "id">) {
    return axios.post<PostData[]>(POST_API, newPost);
  },
  deletePost(id: number) {
    return axios.delete<PostData[]>(`${POST_API}/${id}`);
  },
  updatePost(id: number, updatedPost: Omit<PostData, "id">) {
    return axios.put<PostData>(`${POST_API}/${id}`, updatedPost);
  },
};
