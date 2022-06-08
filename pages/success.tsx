import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/stores";
import { BsBagCheckFill } from "react-icons/bs";

const Success = () => {
  const clearAll = useStore((state) => state.clearAll);

  useEffect(() => {
    clearAll();
  }, []);

  return (
    <div className="bg-white min-h-[75vh] px-10 flex items-center justify-center">
      <div className="bg-disable p-14 rounded-2xl items-center justify-center flex-col flex">
        <p className="text-green-500">
          <BsBagCheckFill size={40} />
        </p>
        <h3 className="mt-4 font-black text-3xl text-tertiary">
          Thank you for your order!
        </h3>
        <p className="font-medium mt-4">
          Check your email inbox for the receipt.
        </p>
        <p className="font-medium">
          If you have any questions, please email:
          <a className="text-primary" href="mailto:order@example.com">
            {" "}
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button className="bg-primary text-white rounded-lg p-3 mt-5 w-[300px]">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
