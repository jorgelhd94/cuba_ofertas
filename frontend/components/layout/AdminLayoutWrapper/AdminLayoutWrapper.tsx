"use client";
import React from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";

type Props = {
  children: React.ReactNode;
};

const PublicLayoutWrapper = (props: Props) => {
  return (
    <div className="relative">
      <NavbarAdmin />
      <main className="py-8 min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
        {props.children}
      </main>
    </div>
  );
};

export default PublicLayoutWrapper;
