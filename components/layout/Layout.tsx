import { NextComponentType, NextPageContext } from "next";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: NextComponentType<NextPageContext> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;