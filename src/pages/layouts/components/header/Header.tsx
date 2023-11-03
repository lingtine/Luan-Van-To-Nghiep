import { SearchBar } from "components";
import TopBar from "./TopBar";
import { CiShoppingCart } from "react-icons/ci";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      <TopBar />
      <div className="container mx-auto px-8 gap-10  flex justify-between items-center py-6">
        <p className="font-bold uppercase text-4xl">TechWave</p>

        <SearchBar />

        <div className="flex items-center gap-2">
          <CiShoppingCart className="text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
