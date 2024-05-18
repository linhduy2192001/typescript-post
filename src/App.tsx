import { useEffect, useState } from "react";
import "./App.css";
import Row from "./components/Row";
import { Spin, message } from "antd";
import { delay } from "./utls/delay";
import { postService } from "./services/postService";
import { Paginate } from "./components/Paginate";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostData[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const limit = 10;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParams = params.get("page");
    const initialPage = pageParams ? parseInt(pageParams, 10) : 1;
    setPage(initialPage);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPost(page, limit);

        delay(500);
        if (!(res.status == 200)) {
          throw new Error("Không thể gọi dữ liệu");
        }
        message.success("Gọi dữ liệu thành công!");
        setPosts(res.data);
        const totalCount = 100;
        const totalPages = Math.ceil(totalCount / limit);
        setTotalPage(totalPages);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        message.error("Không thể gọi dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <>
      <div className="table-wrapper">
        <Spin spinning={loading}>
          <table className="table">
            <thead className="title">
              <tr>
                <th>UserId</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
              {posts.map((e) => (
                <Row key={e.id} {...e} />
              ))}
            </thead>
          </table>
        </Spin>
        <Paginate
          totalPage={totalPage}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default App;
