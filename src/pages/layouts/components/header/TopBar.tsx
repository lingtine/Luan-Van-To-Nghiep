import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "redux/store";
interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  const { accessToken } = useAppSelector((state) => state.authSlice);

  return (
    <div className="w-full bg-primary text-color-1 p-1 py-2">
      <div className="container flex justify-around xl:justify-end text-sm gap-6">
        <Link to={"/about"}>Về chúng tôi</Link>
        <Link to={"/contact-us"}>Góp ý</Link>
        {accessToken ? (
          <Link to={"/account"}>Tài khoản</Link>
        ) : (
          <>
            <Link to={"/register"}>Đăng kí</Link>
            <Link to={"/login"}>Đăng Nhập</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
