import { useEffect, useState } from "react";

interface PageControlHook {
  page: number;
  totalPage: number;
  handlePageChange: (newPage: number) => void;
}

const usePageControl = (limit: number): PageControlHook => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParams = params.get("page");
    const initialPage = pageParams ? parseInt(pageParams, 10) : 1;
    setPage(initialPage);
  }, []);

  useEffect(() => {
    const totalCount = 100;
    const totalPages = Math.ceil(totalCount / limit);
    setTotalPage(totalPages);
  }, [limit]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return {
    page,
    totalPage,
    handlePageChange,
  };
};

export default usePageControl;
