import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
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
  const maxSizePage = Math.floor(totalCount / pageSize) + 1;

  const router = useNavigate();
  let renderItemPage;
  renderItemPage = Array(maxSizePage)
    .fill(0)
    .map((_, index) => {
      return (
        <li key={index}>
          <Link to={index === 0 ? `${url}` : `${url}/${index}`}>
            <IconButton variant={pageIndex == index ? "filled" : "text"}>
              {index + 1}
            </IconButton>
          </Link>
        </li>
      );
    });

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
    if (pageIndex) {
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
