import { SearchBar } from "components";
import TopBar from "./TopBar";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Badge } from "@material-tailwind/react";
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

        <p className="font-bold uppercase text-lg lg:text-2xl xl:text-4xl">
          <Link to="/">TechWave</Link>
        </p>

        <div className="hidden lg:flex">
          <HeaderCategory />
        </div>
        <div className="flex gap-4">
          <div className="relative w-full max-w-xs hidden xl:block">
            <SearchBar />
          </div>
          <Link
            to={accessToken ? "/cart-client" : "/login"}
            className="flex items-center gap-2 relative cursor-pointer"
          >
            <Badge content={isSuccess ? data.items.length : 0}>
              <CiShoppingCart className="text-2xl lg:text-3xl xl:text-4xl" />
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
