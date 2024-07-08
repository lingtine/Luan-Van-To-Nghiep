import TopBar from "./TopBar";

import Navigation from "./Navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="fixed flex flex-col w-full max-h-32 h-full top-0 border-b border-[#c9c5c5] z-10">
      <TopBar />
      <div className="bg-white flex-1">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
