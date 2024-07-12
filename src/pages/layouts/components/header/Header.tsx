import { useEffect, useState } from "react";
import classNames from "classnames";
import HeaderBottom from "./header-bottom";
import Navigation from "./Navigation";

interface HeaderProps {
  scrollOverFlow: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrollOverFlow }) => {
  const [visibleHeaderBottom, setVisibleHeaderBottom] =
    useState<boolean>(false);

  useEffect(() => {
    if (scrollOverFlow) {
      setVisibleHeaderBottom(false);
    } else {
      setVisibleHeaderBottom(true);
    }
  }, [scrollOverFlow]);
  const headerClass = classNames(
    "bg-dark  transition-all duration-700 overflow-hidden flex flex-col w-full overflow-hidden",
    {
      "h-36": scrollOverFlow && visibleHeaderBottom,
      "h-24": !visibleHeaderBottom,
      "fixed top-0 z-[99999] ": scrollOverFlow,
    }
  );

  return (
    <header className={headerClass}>
      <div className="flex-1 tran">
        <Navigation
          scrollOverFlow={scrollOverFlow}
          onShowHeaderBottom={() => {
            setVisibleHeaderBottom(!visibleHeaderBottom);
          }}
        />
      </div>
      <HeaderBottom />
    </header>
  );
};

export default Header;
