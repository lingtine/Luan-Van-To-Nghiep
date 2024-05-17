import React from "react";
import MenuSection from "./sidebar-menu/menu-section";
import { Typography } from "@material-tailwind/react";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className="fixed w-80 bg-[#22345e] h-full py-4 p-2">
      <div className="mb-2 p-4">
        <Typography variant="h5" className="text-secondary">
          TeachWave
        </Typography>
      </div>
      <MenuSection />
    </div>
  );
};

export default SideBar;
