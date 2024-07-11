import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const [scrollOverflow, setScrollOverflow] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    if (position > 300) {
      setScrollOverflow(true);
    } else {
      setScrollOverflow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <React.Fragment>
      <Header scrollOverFlow={scrollOverflow} />
      <div className={`${scrollOverflow && "pt-36"} h-[4000px]`}>
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
