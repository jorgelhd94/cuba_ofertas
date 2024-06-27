"use client";

import { SearchIcon } from "@/components/shared/icons/SearchIcon";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Logo from "../../shared/logo";
import { ThemeSwitcher } from "../../shared/theme-switcher";
import SideBarMain from "../SideBarMain/SideBarMain";
import { SearchForm } from "@/components/search/SearchForm/SearchForm";
import { usePathname, useRouter } from "next/navigation";

function NavbarMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchText = (searchText: string) => {
    if (!searchText.trim()) {
      router.push(`/search`);
    }
    else {
      router.push(`/search?q=${searchText}`);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex max-sm:gap-2 sm:flex-wrap justify-around sm:justify-between items-center">
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

            <Link href="/" className="max-md:hidden">
              <Logo />
            </Link>
          </div>

          <div className="md:w-1/2">
            <SearchForm
              handleSearchText={handleSearchText}
              loading={false}
              standalone
            />
          </div>

          <div className="flex items-center lg:order-2 gap-4">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <SideBarMain isSidebarOpen={isMenuOpen} onOpenSidebar={setIsMenuOpen} />
    </>
  );
}

export default NavbarMain;
