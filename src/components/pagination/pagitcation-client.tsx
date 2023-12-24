import React, { useState } from "react";

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
  const maxSizePage = Math.floor(totalNumber / pageSize) + 1;

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
        {Array(maxSizePage)
          .fill(0)
          .map((_, index) => {
            return (
              <IconButton key={index} {...getItemProps(index)}>
                {index + 1}
              </IconButton>
            );
          })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={pageIndex === maxSizePage || totalNumber < pageSize}
      >
        Next
        <FaArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationClient;
