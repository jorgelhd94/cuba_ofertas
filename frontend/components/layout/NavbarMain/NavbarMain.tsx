"use client";

import { SearchIcon } from "@/components/shared/icons/SearchIcon";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Logo from "../../shared/logo";
import { ThemeSwitcher } from "../../shared/theme-switcher";
import SideBarMain from "../SideBarMain/SideBarMain";

function NavbarMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <Button
              size="xs"
              outline={!isMenuOpen}
              gradientDuoTone="purpleToBlue"
              className="mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HiMenu className="h-6 w-6" />
            </Button>

            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center lg:order-2 gap-4 pr-6">
            <Link href="/search">
              <SearchIcon />
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <SideBarMain isSidebarOpen={isMenuOpen} onOpenSidebar={setIsMenuOpen}/>
    </>
  );
}

export default NavbarMain;
