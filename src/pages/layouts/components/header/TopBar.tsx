import React from "react";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className="flex justify-center w-full bg-primary text-color-1">
      <p className="my-2">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        ShopNow
      </p>
    </div>
  );
};

export default TopBar;
