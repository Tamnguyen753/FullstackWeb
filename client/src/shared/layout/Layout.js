import React from "react";
import MainContent from "../components/MainContent/Index";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Layout;
