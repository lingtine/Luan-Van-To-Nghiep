import React from "react";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className="w-full bg-primary text-color-1 p-1">
      <div className="container flex justify-end text-sm gap-6">
        <p>Về chúng tôi</p>
        <p>Góp ý</p>
        <p>Đăng kí</p>
        <p>Đăng Nhập</p>
      </div>
    </div>
  );
};

export default TopBar;
