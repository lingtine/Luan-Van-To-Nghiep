import React from "react";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className="w-full bg-primary text-color-1 px-1 py-2">
      <div className="container text-center text-xs">
        Tận hưởng trải nghiệm công nghệ đỉnh cao với điện thoại thông minh mới
        nhất – hiệu năng vượt trội, thiết kế tinh tế, giá cả phải chăng!
      </div>
    </div>
  );
};

export default TopBar;
