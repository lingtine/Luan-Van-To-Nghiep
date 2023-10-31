import { SearchBar } from "components";
import TopBar from "./TopBar";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import Navigation from "./Navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      <TopBar />
      <div className="container mx-auto px-8  flex justify-between items-center py-6">
        <p className="font-bold uppercase text-4xl">TechWave</p>
        <ul className="flex justify-center gap-12">
          <li className="hover:underline hover:text-primary text-base ">
            Home
          </li>
          <li className="hover:underline hover:text-primary text-base ">
            Category
          </li>
          <li className="hover:underline hover:text-primary text-base ">
            Contact
          </li>
          <li className="hover:underline hover:text-primary text-base ">
            About
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <SearchBar />

          <CiShoppingCart className="text-3xl" />

          <CiUser className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
