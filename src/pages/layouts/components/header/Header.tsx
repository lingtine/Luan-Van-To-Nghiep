import HeaderBottom from "./header-bottom";

import Navigation from "./Navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-dark  flex flex-col w-full max-h-36 h-full top-0 z-10">
      <div className="flex-1">
        <Navigation />
      </div>
      <HeaderBottom />
    </header>
  );
};

export default Header;
