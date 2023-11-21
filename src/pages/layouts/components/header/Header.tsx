import { SearchBar } from "components";
import TopBar from "./TopBar";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      <TopBar />
      <div className="container mx-auto px-8 gap-10  flex justify-between items-center py-6">
        <p className="font-bold uppercase text-4xl"><Link to="/">TechWave</Link></p>

        <SearchBar />

        <Link to="/cart" className="flex items-center gap-2">
          <CiShoppingCart className="text-4xl" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
