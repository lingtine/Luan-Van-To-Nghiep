import React from "react";
import MenuSection from "./sidebar-menu/menu-section";
import { Avatar, Typography } from "@material-tailwind/react";
import { useAppSelector } from "redux/store";
interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  console.log(user);

  return (
    <div className="fixed w-80 bg-[#22345e] h-full py-4 p-2">
      <div className="mb-2 p-4">
        <div className="flex items-center gap-4">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          />
          <div>
            <Typography variant="h6" color="white">
              Tania Andrew
            </Typography>
            <Typography variant="small" color="blue" className="font-normal">
              Web Developer
            </Typography>
          </div>
        </div>
      </div>
      <MenuSection />
    </div>
  );
};

export default SideBar;
