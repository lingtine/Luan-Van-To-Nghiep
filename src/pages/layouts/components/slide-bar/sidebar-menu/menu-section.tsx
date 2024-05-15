import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import { IoExitOutline } from "react-icons/io5";

import { useLogoutMutation } from "redux/api/auth/authApi";
import MenuItem from "./menu-item";

import { navigation } from "share/constant/navigator";

interface MenuSectionProps {}

const MenuSection: React.FC<MenuSectionProps> = () => {
  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();
  const { refreshToken } = useAppSelector((state) => state.authSlice);
  const [open, setOpen] = React.useState(0);
  useEffect(() => {
    if (isSuccess) {
      navigate("/login-admin");
    }
  }, [isSuccess, navigate]);

  const handleOpen = (num: number) => {
    if (num === open) {
      return;
    }
    setOpen(num);
  };

  return (
    <List>
      {navigation.map((item, index) => (
        <MenuItem
          item={item}
          open={open}
          key={index}
          index={index}
          onOpen={handleOpen}
        />
      ))}
      <ListItem
        className="text-secondary"
        onClick={() => {
          logout({ refreshToken });
        }}
      >
        <ListItemPrefix>
          <IoExitOutline />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </List>
  );
};

export default MenuSection;
