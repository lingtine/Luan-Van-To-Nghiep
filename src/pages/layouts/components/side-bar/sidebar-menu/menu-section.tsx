import React from "react";
import { List } from "@material-tailwind/react";
import MenuItem from "./menu-item";

import { navigation } from "share/constant/navigator";

interface MenuSectionProps {}

const MenuSection: React.FC<MenuSectionProps> = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (num: number) => {
    if (num === open) {
      setOpen(0);
    } else {
      setOpen(num);
    }
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
    </List>
  );
};

export default MenuSection;
