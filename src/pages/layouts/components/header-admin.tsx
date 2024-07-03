import React from "react";
import { Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
interface HeaderAdminProps {}

const HeaderAdmin: React.FC<HeaderAdminProps> = () => {
  const location = useLocation();
  const pageName =
    location.pathname.split("/")[2].charAt(0).toUpperCase() +
      location.pathname.split("/")[2].slice(1) || "Dashboard";
  return (
    <header>
      <Typography variant="h3" className="px-4">
        {pageName}
      </Typography>
    </header>
  );
};

export default HeaderAdmin;
