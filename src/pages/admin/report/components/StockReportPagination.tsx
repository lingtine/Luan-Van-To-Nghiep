interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  total: number;
  onChangePage: Function;
}

const StockReportPagination = ({
  pageIndex,
  pageSize,
  total,
  onChangePage,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  const pageNeighbour = 2;

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      onChangePage(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < totalPages) {
      onChangePage(pageIndex + 1);
    }
  };

  const createPageRange = (from: number, to: number, step = 1) => {
    const range = [];
    for (let i = from; i <= to; i += step) {
      range.push(i);
    }
    return range;
  };
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbour * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, pageIndex - pageNeighbour);
      const endPage = Math.min(totalPages - 1, pageIndex + pageNeighbour);
      let pages: (string | number)[] = createPageRange(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = createPageRange(
            startPage - spillOffset,
            startPage - 1
          );
          pages = ["LEFT", ...extraPages, ...pages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = createPageRange(
            endPage + 1,
            endPage + spillOffset
          );
          pages = [...pages, ...extraPages, "RIGHT"];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = ["LEFT", ...pages, "RIGHT"];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return createPageRange(1, totalPages);
  };

  const pages = fetchPageNumbers();
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className="px-3 py-1 border bg-white text-blue-500  disabled:opacity-50"
        onClick={handlePreviousPage}
        disabled={pageIndex === 1}
      >
        Previous
      </button>
      {pages.map((page, index) => {
        if (page === "LEFT")
          return (
            <span key={index} className="px-3 py-1">
              ...
            </span>
          );
        if (page === "RIGHT")
          return (
            <span key={index} className="px-3 py-1">
              ...
            </span>
          );

        return (
          <button
            key={index}
            className={`px-3 py-1 border ${
              pageIndex === page
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => onChangePage(page as number)}
          >
            {page}
          </button>
        );
      })}
      <button
        className="px-3 py-1 border bg-white text-blue-500 disabled:opacity-50"
        onClick={handleNextPage}
        disabled={pageIndex === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default StockReportPagination;
