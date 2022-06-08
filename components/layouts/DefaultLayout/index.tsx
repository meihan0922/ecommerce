import React from "react";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="">
      <Head>
        <title>JS Mastery Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="max-w-7xl m-auto w-full pt-[60px]">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
