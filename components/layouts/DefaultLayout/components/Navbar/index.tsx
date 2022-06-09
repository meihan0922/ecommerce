import Link from "next/link";
import Cart from "./components/Cart";

const Navbar = () => (
  <div className="fixed flex justify-between py-2.5 px-2 w-full bg-white z-10">
    <p className="text-secondary sm:text-lg xl:text-xl">
      <Link href="/">JSM Headphones</Link>
    </p>
    <Cart />
  </div>
);

export default Navbar;
