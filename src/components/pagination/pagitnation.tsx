import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  url: string;
}

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageSize,
  totalCount,
  url,
}) => {
  const maxSizePage = Math.ceil(totalCount / pageSize);
  const getPagination = () => {
    const pages = [];
    if (maxSizePage === 1) {
      pages.push(0);
      return pages;
    }
    const startPage = Math.max(1, pageIndex - 2);
    const endPage = Math.min(maxSizePage - 1, pageIndex + 2);

    pages.push(0); // Always show the first page

    if (startPage > 2) {
      pages.push("..."); // Ellipsis for skipped pages
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }

    if (endPage < maxSizePage - 1) {
      pages.push("...");
    }

    pages.push(maxSizePage - 1); // Always show the last page

    return pages;
  };

  const pagination = getPagination();

  const router = useNavigate();
  let renderItemPage;
  renderItemPage = pagination.map((page, index) => (
    <React.Fragment key={index}>
      {page === "..." ? (
        <span className="px-4 py-2">...</span>
      ) : (
        <li key={index}>
          <Link to={page === 0 ? `${url}` : `${url}/${page}`}>
            <IconButton variant={pageIndex === page ? "filled" : "text"}>
              {+page + 1}
            </IconButton>
          </Link>
        </li>
      )}
    </React.Fragment>
  ));

  const handleBack = () => {
    if (pageIndex) {
      if (pageIndex !== 0) {
        if (pageIndex === 1) {
          router(`${url}`);
        } else {
          router(`${url}/${pageIndex - 1}`);
        }
      }
    }
  };

  const handleForward = () => {
    if (pageIndex !== undefined || pageIndex !== null) {
      if (pageIndex !== maxSizePage) {
        router(`${url}/${pageIndex + 1}`);
      }
    }
  };

  return (
    <ul className="flex items-center gap-2 bg-white py-1 px-2 rounded-md">
      <li>
        <Button
          onClick={handleBack}
          disabled={pageIndex === 0}
          className="flex gap-2 items-center"
        >
          <IoIosArrowBack />
          Previous
        </Button>
      </li>

      {renderItemPage}

      <li>
        <Button
          className="flex gap-2 items-center"
          onClick={handleForward}
          disabled={maxSizePage === 1 || pageIndex + 1 === maxSizePage}
        >
          next
          <IoIosArrowForward />
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
