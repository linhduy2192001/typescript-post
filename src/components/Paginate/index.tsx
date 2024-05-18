import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

interface PaginateProps {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export const Paginate: React.FC<PaginateProps> = ({
  totalPage,
  page,
  onPageChange,
}) => {
  const updateUrl = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const renderItem = () => {
    const list = [];
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPage, page + 1);

    if (page <= 2) {
      end = Math.min(totalPage, 3);
    }
    if (page >= totalPage - 1) {
      start = Math.max(1, totalPage - 2);
    }

    for (let i = start; i <= end; i++) {
      list.push(
        <li key={i} className={classNames("page-item", { active: i === page })}>
          <button
            className="page-link"
            onClick={() => {
              onPageChange(i);
              updateUrl(i);
            }}
          >
            {i}
          </button>
        </li>
      );
    }

    return list;
  };
  const handleNextPage = () => {
    if (page < totalPage) {
      const newPage = page + 1;
      onPageChange(newPage);
      updateUrl(newPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      onPageChange(newPage);
      updateUrl(newPage);
    }
  };
  return (
    <nav
      aria-label="Page navigation example"
      className="d-flex justify-content-center"
    >
      <ul className="pagination">
        <li className="page-item">
          <button onClick={handlePrevPage} className="page-link">
            Previous
          </button>
        </li>
        {renderItem()}
        <li className="page-item">
          <button onClick={handleNextPage} className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
