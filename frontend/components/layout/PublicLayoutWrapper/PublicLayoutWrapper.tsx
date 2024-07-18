"use client";
import React, { useState } from "react";
import { LoginModalContextt } from "@/lib/context/LoginModalContext";
import LoginModal from "@/components/auth/LoginModal";
import NavbarMain from "../Navbars/NavbarMain/NavbarMain";

type Props = {
  children: React.ReactNode;
};

const PublicLayoutWrapper = (props: Props) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <LoginModalContextt.Provider
      value={{ isLoginModalOpen, setIsLoginModalOpen }}
    >
      <div className="relative">
        <NavbarMain />
        <main className="py-8 min-h-max lg:min-h-screen bg-gradient-to-tr from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-800 via-transparent dark:to-black">
          {props.children}
        </main>

        <LoginModal
          isOpen={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
        />
      </div>
    </LoginModalContextt.Provider>
  );
};

export default PublicLayoutWrapper;
