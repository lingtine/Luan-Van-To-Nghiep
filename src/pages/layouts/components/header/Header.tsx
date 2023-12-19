import { SearchBar } from "components";
import TopBar from "./TopBar";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";

import HeaderCategory from "./HeaderCategory";
import { useAppSelector } from "redux/store";
import { useGetDetailCartQuery } from "redux/api/cart/cart";
import { LuMenuSquare } from "react-icons/lu";
import SlideDrawer from "./slide-drawer";
import { useState } from "react";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { accessToken } = useAppSelector((state) => state.authSlice);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isSuccess } = useGetDetailCartQuery(null);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <TopBar />
      <div className="container mx-auto px-8 gap-10  flex justify-between items-center py-6">
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

        <p className="font-bold uppercase text-lg text xl:text-4xl">
          <Link to="/">TechWave</Link>
        </p>

        <div className="hidden lg:flex">
          <HeaderCategory />
        </div>
        <div className="flex gap-4">
          <div className="relative w-full max-w-xs hidden lg:block">
            <SearchBar />
          </div>
          <Link
            to={accessToken ? "/cart-client" : "/login"}
            className="flex items-center gap-2 relative cursor-pointer"
          >
            <CiShoppingCart className="text-2xl xl:text-4xl" />
            <span className="bg-red-500 text-white text-sm lg:text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center ml-1 absolute bg-hoverColor top-0 right-[-8px]">
              {isSuccess ? data.items.length : "0"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
