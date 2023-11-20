import React from "react";
import { Link } from "react-router-dom";
interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  const isLogin = true;

  return (
    <div className="w-full bg-primary text-color-1 p-1">
      <div className="container flex justify-end text-sm gap-6">
        <Link to={"/about"}>Về chúng tôi</Link>
        <Link to={"/contact"}>Góp ý</Link>
        {isLogin ? (
          <Link to={"/profile"}>Tài khoản</Link>
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
