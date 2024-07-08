import React from "react";
import { Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import TileHeaderAdmin from "share/constant/title-header-admin";
interface HeaderAdminProps {}

const HeaderAdmin: React.FC<HeaderAdminProps> = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/")[2] || "Dashboard";
  return (
    <header>
      <Typography variant="h3" className="px-4">
        {TileHeaderAdmin[pageName]}
      </Typography>
    </header>
  );
};

export default HeaderAdmin;
