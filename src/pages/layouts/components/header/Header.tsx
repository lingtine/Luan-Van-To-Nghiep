import { SearchBar } from "components";
import TopBar from "./TopBar";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartBill from "pages/client/cart/cart-bill";
import HeaderCategory from "./HeaderCategory";
import { useAppSelector } from "redux/store";
import { useGetDetailCartQuery } from "redux/api/cart/cart";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // const [toogle, setToogle] = useState(false);
  const { accessToken } = useAppSelector((state) => state.authSlice);

  const { data, isSuccess } = useGetDetailCartQuery(null);

  // const onToogle = (status: boolean) => {
  //   setToogle(status);
  // };

  return (
    <>
      <div>
        <TopBar />
        <div className="container mx-auto px-8 gap-10  flex justify-between items-center py-6">
          <p className="font-bold uppercase text-4xl">
            <Link to="/">TechWave</Link>
          </p>

          <SearchBar />
          <Link
            to={accessToken ? "/cart-client" : "/login"}
            className="flex items-center gap-2 relative cursor-pointer"
          >
            <CiShoppingCart className="text-4xl" />
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1 absolute bg-hoverColor top-0 right-[-8px]">
              {isSuccess ? data.items.length : "0"}
            </span>
          </Link>

          {/* <div
            onClick={() => onToogle(true)}
            className="flex items-center gap-2 relative cursor-pointer"
          >
            <CiShoppingCart className="text-4xl" />
            <span className="bg-red-500 text-white-200 text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1 absolute bg-hoverColor top-0 right-[-8px]">
              {isSuccess ? data.items.length : "0"}
            </span>
          </div> */}
        </div>
        {/* {toogle && <CartBill onToogle={onToogle} />} */}
      </div>
      <hr className="bg-black text-black border-slate-500 border-t-[0.5px] w-full"></hr>
      <HeaderCategory />
      <hr className="bg-black text-black border-slate-500 border-t-[0.5px] w-full mb-3"></hr>
    </>
  );
};

export default Header;
