import React from "react";

import { Button, IconButton } from "@material-tailwind/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface PaginationClientProps {
  pageIndex: number;
  pageSize: number;
  totalNumber: number;
  onChange: Function;
}

const PaginationClient: React.FC<PaginationClientProps> = ({
  pageIndex,
  pageSize,
  totalNumber,
  onChange,
}) => {
  const maxSizePage =
    totalNumber / pageSize === 0 ? 1 : Math.floor(totalNumber / pageSize) + 1;
  const getPagination = () => {
    const pages = [];
    pages.push(1);
    if (maxSizePage === 1) {
      return pages;
    }
    const startPage = Math.max(2, pageIndex - 2);
    const endPage = Math.min(maxSizePage - 1, pageIndex + 2);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < maxSizePage - 1) {
      pages.push("...");
    }

    pages.push(maxSizePage);

    return pages;
  };

  const pagination = getPagination();

  const getItemProps = (index: number) =>
    ({
      variant: pageIndex === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        onChange(index);
      },
      className: "rounded-full",
    } as any);

  const next = () => {
    if (pageIndex === maxSizePage) return;

    onChange(pageIndex + 1);
  };

  const prev = () => {
    if (pageIndex === 0) return;

    onChange(pageIndex - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={pageIndex === 0}
      >
        <FaArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>

      <div className="flex items-center gap-2">
        {pagination.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <IconButton key={index} {...getItemProps(index)}>
                {index + 1}
              </IconButton>
            )}
          </React.Fragment>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={pageIndex + 1 === maxSizePage || totalNumber < pageSize}
      >
        Next
        <FaArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationClient;
