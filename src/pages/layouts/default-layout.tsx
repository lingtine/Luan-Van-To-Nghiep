import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="mt-40">
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
