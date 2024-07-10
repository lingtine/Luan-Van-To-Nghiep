import { BiCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import Navigation from "./Navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-dark  flex flex-col w-full max-h-36 h-full top-0 z-10">
      <div className="flex-1">
        <Navigation />
      </div>
      <div>
        <div className="container flex items-center">
          <div className="py-3 text-sm w-full max-w-72 flex justify-between items-center   px-4 rounded-t hover:text-white bg-light-text-emphasis text-secondary-border-subtle">
            <div className="flex items-center gap-2">
              <BiCategory />
              <span>Danh mục sản phẩm</span>
            </div>
            <IoIosArrowDown />
          </div>
          <ul className="flex gap-8 ml-9">
            <li className="text-secondary-border-subtle hover:text-white">
              Trang chủ
            </li>
            <li className="text-secondary-border-subtle hover:text-white">
              Liên hệ
            </li>
            <li className="text-secondary-border-subtle hover:text-white">
              Góp ý
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
