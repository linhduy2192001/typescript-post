import Row from "../components/Row";
import { Paginate } from "../components/Paginate";
import { postService } from "../services/postService";

import { useQuery } from "@tanstack/react-query";
import _default from "antd/es/theme";
import usePageControl from "../hooks/usePageControl";
import Skeleton from "../components/Skeleton";
import { useState } from "react";

const Post = () => {
  // const [page, setPage] = useState<number>(1);
  // const [totalPage, setTotalPage] = useState<number>(1);
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });
  const { page, totalPage, handlePageChange } = usePageControl(10);
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => await postService.getPost(page),
    queryKey: ["page", page],
    staleTime: 60 * 1000,
  });

  // const {
  //   data: posts,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryFn: async () => await postService.getPost(page),
  //   queryKey: [page],
  // });
  //   const [loading, setLoading] = useState(true);
  //   //   const [posts, setPosts] = useState<PostData[]>([]);

  // const limit = 10;
  // const totalCount = 100;
  // const totalPages = Math.ceil(totalCount / limit);
  // setTotalPage(totalPages);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const pageParams = params.get("page");
  //   const initialPage = pageParams ? parseInt(pageParams, 10) : 1;
  //   setPage(initialPage);
  // }, []);

  // useEffect(() => {
  //     const fetchPost = async () => {
  //       try {
  //         const res = await postService.getPost(page, limit);

  //         delay(500);

  //         message.success("Gọi dữ liệu thành công!");
  //         setPosts(res.data);

  // const totalCount = 100;
  // const totalPages = Math.ceil(totalCount / limit);
  // setTotalPage(totalPages);
  //         setLoading(false);
  //       } catch (error) {
  //         console.log("error", error);
  //         message.error("Không thể gọi dữ liệu");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchPost();
  // }, [page]);

  // const handlePageChange = (newPage: number) => {
  //   setPage(newPage);
  // };

  const handleAddPost = () => {};

  const handleUpdate = () => {};

  const handleDelete = () => {};
  return (
    <>
      <form onSubmit={handleAddPost} className="form p-3">
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="title"
            id="title"
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          ></textarea>
        </div>
        <button className=" btn btn-primary btn m-3" type="submit">
          Add Post
        </button>
      </form>

      <div className="table-wrapper">
        {error && <p>Không thể tạo bảng bài viết!</p>}
        <table className="table">
          <thead className="title">
            <tr>
              <th>UserId</th>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
              <th>Chức năng</th>
            </tr>
            {isLoading
              ? Array.from(Array(10)).map((_, i) => <PostLoading key={i} />)
              : posts?.data.map((e) => (
                  <Row
                    {...e}
                    key={e.id}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
          </thead>
        </table>
        <Paginate
          totalPage={totalPage}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Post;

export const PostLoading = () => {
  return (
    <tr style={{ maxWidth: "100%", width: "fit-content" }}>
      <th>
        <Skeleton height={62} width="100%" />
      </th>
      <th>
        {" "}
        <Skeleton height={62} width="100%" />
      </th>
      <th>
        {" "}
        <Skeleton height={62} width="100%" />
      </th>
      <th>
        {" "}
        <Skeleton height={62} width="100%" />
      </th>
      <th>
        {" "}
        <Skeleton height={62} width="100%" />
      </th>
    </tr>
  );
};
