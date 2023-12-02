import { SearchBar } from "components";
import TopBar from "./TopBar";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartBill from "pages/client/cart/cart-bill";
import HeaderCategory from "./HeaderCategory";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [toogle, setToogle] = useState(false)

  const onToogle = (status : boolean) => {
    setToogle(status)
  }
  return (
    <>
    <div>
      <TopBar />
      <div className="container mx-auto px-8 gap-10  flex justify-between items-center py-6">
        <p className="font-bold uppercase text-4xl"><Link to="/">TechWave</Link></p>

        <SearchBar />

        <div onClick={() => onToogle(true)} className="flex items-center gap-2">
          <CiShoppingCart className="text-4xl" />
        </div>
      </div>
      {
        toogle && <CartBill onToogle={onToogle}/>
      }
    </div>
    <hr className="bg-black text-black border-slate-500 border-t-[0.5px] w-full"></hr>
    <HeaderCategory />
    <hr className="bg-black text-black border-slate-500 border-t-[0.5px] w-full mb-3"></hr>
    </>
  );
};

export default Header;
