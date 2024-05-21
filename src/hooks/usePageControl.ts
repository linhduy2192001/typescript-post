import { useEffect, useState } from "react";

interface PageControlHook {
  page: number;
  limit: number;
  totalPage: number;
  handlePageChange: (newPage: number) => void;
  setLimit: (newLimit: number) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const usePageControl = (defaultLimit: number): PageControlHook => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(defaultLimit);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParams = params.get("page");
    const limitParams = params.get("limit");
    const initialPage = pageParams ? parseInt(pageParams, 10) : 1;
    const initialLimit = limitParams ? parseInt(limitParams, 10) : defaultLimit;
    setPage(initialPage);
    setLimit(initialLimit);
  }, [defaultLimit]);

  useEffect(() => {
    const totalCount = 100; // Số lượng bài viết tổng cố định hoặc có thể lấy từ server
    const totalPages = Math.ceil(totalCount / limit);
    setTotalPage(totalPages);
  }, [limit]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    setPage(newPage);
  };

  const changeLimit = (newLimit: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", "1");
    params.set("limit", newLimit.toString());
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    setPage(1);
    setLimit(newLimit);
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      handlePageChange(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  return {
    page,
    limit,
    totalPage,
    handlePageChange,
    setLimit: changeLimit,
    handleNextPage,
    handlePrevPage,
  };
};

export default usePageControl;
