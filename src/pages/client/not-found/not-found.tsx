import React from "react";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaHouseChimney } from "react-icons/fa6";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="container mt-10">
      <Breadcrumbs>
        <Link to="/" className="opacity-60">
          <FaHouseChimney />
        </Link>
        <Link to="/no-found">
          <span>404 Error</span>
        </Link>
      </Breadcrumbs>
      <div className="py-36 flex justify-between items-center flex-col gap-10">
        <h2 className="text-9xl font-medium">404 Not Found</h2>
        <p className="text-base">
          Không tìm thấy trang bạn đã truy cập. Bạn có thể vào trang chủ.
        </p>
        <Link to={"/"}>
          <Button size="lg" className="bg-primary">
            Quay về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
