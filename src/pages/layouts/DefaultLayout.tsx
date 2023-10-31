import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
interface DefaultLayoutProps {
  children: JSX.Element;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
