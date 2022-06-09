import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="text-tertiary text-center md:mt-12 px-7 py-2.5 font-bold flex flex-col items-center gap-2.5 justify-center text-sm">
      <p>2022 JSM Headphones All rights reserverd</p>
      <p className="flex gap-2.5 text-2xl">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
