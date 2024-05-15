import React from "react";
import MenuSection from "./sidebar-menu/menu-section";
import { Typography } from "@material-tailwind/react";

interface SlideBarProps {}

const SlideBar: React.FC<SlideBarProps> = () => {
  return (
    <div className="fixed w-72 bg-[#22345e] h-full">
      <div className="mb-2 p-4">
        <Typography variant="h5" className="text-secondary">
          TeachWave
        </Typography>
      </div>
      <MenuSection />
    </div>
  );
};

export default SlideBar;
