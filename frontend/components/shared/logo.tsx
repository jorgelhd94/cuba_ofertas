import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* <Image src="/logo.svg" alt="Logo" width={32} height={32} /> */}
      <h2 className="font-bold text-xl flex flex-col gap-0 leading-none m-0 p-0">
        {/* <span className="text-sm leading-none text-primary-800">Cuba</span> */}
        SPY-SM23
      </h2>
    </div>
  );
};

export default Logo;
