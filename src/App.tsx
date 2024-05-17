import { useEffect, useState } from "react";
import "./App.css";
import Row from "./components/Row";
import { Spin, message } from "antd";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts");

          if (!res.ok) {
            throw new Error("Không thể gọi dữ liệu");
          }
          const data = await res.json();
          setPosts(data);
          setLoading(false);
          message.success("Hiển thị dữ liệu thành công");
        }, 1000);
      } catch (err) {
        console.log("err", err);
        setLoading(false);
        message.error("Không thể hiển thị dữ liệu!");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="table-wrapper">
        <Spin spinning={loading}>
          <table className="fl-table">
            <thead>
              <tr>
                <th>UserId</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            {posts.map((e) => (
              <Row key={e.id} {...e} />
            ))}
          </table>
        </Spin>
      </div>
    </>
  );
}

export default App;
