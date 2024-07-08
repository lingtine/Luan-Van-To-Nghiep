import React from "react";
import { useState } from "react";

import { LuMenuSquare } from "react-icons/lu";
import SlideDrawer from "./slide-drawer";
import HeaderCategory from "./HeaderCategory";

interface MenuMobileProps {}

const MenuMobile: React.FC<MenuMobileProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="text-xl lg:hidden">
      <LuMenuSquare
        onClick={() => {
          handleOpen();
        }}
      />

      {isOpen && (
        <SlideDrawer onClose={handleClose} status={isOpen}>
          <HeaderCategory onClose={handleClose} />
        </SlideDrawer>
      )}
    </div>
  );
};

export default MenuMobile;
