"use client";
import React from "react";
import NavbarAdmin from "../Navbars/NavbarAdmin/NavbarAdmin";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";

type Props = {
  children: React.ReactNode;
};

const AdminLayoutWrapper = (props: Props) => {
  return (
    <div className="relative">
      <NavbarAdmin />
      <SidebarAdmin standalone className="max-lg:hidden" />
      <main className="lg:ml-64 py-8 min-h-screen lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
        {props.children}
      </main>
    </div>
  );
};

export default AdminLayoutWrapper;
