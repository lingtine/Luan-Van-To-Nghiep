import React from "react";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className="w-full bg-primary text-color-1 p-1 py-2">
      <div className="container flex justify-around xl:justify-end text-sm gap-6">
        Tận hưởng trải nghiệm công nghệ đỉnh cao với điện thoại thông minh mới
        nhất – hiệu năng vượt trội, thiết kế tinh tế, giá cả phải chăng!
      </div>
    </div>
  );
};

export default TopBar;
