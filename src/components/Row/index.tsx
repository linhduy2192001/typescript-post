import React from "react";

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const Row: React.FC<PostProps> = ({
  userId,
  id,
  title,
  body,
  onUpdate,
  onDelete,
}) => {
  return (
    <tr>
      <td>{userId}</td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{body}</td>
      <td>
        {" "}
        <button className="btn btn-primary m-3" onClick={() => onUpdate(id)}>
          Update
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
