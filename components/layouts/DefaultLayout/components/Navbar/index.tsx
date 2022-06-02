import React from "react";
import Link from "next/link";
import Cart from "./components/Cart";
// import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  //   const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="fixed flex justify-between py-2.5 px-2 w-full bg-white z-10">
      <p className="text-secondary text-lg">
        <Link href="/">JSM Headphones</Link>
      </p>
      <Cart />
    </div>
  );
};

export default Navbar;
