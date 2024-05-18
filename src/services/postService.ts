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
};
