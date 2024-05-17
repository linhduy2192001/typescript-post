import React from "react";

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Row: React.FC<PostProps> = ({ userId, id, title, body }) => {
  return (
    <tbody>
      <tr>
        <td>{userId}</td>
        <td>{id}</td>
        <td>{title}</td>
        <td>{body}</td>
      </tr>
    </tbody>
  );
};

export default Row;
