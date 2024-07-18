"use client";

import NotificationMenu from "@/components/notifications/NotificationMenu/NotificationMenu";
import { SearchForm } from "@/components/search/SearchForm/SearchForm";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { HiMenu } from "react-icons/hi";
import Logo from "../../shared/logo";
import { ThemeSwitcher } from "../../shared/theme-switcher";
import SideBarMain from "../SideBarMain/SideBarMain";
import SearchFormSkeleton from "@/components/shared/skeletons/SearchFormSkeleton";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { VerticalDots } from "@/components/shared/icons/VerticalDots";
import BurgerBtn from "@/components/shared/buttons/BurgerBtn";
import LoginButton from "@/components/auth/LoginButton";

function NavbarMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 sticky left-0 right-0 top-0 z-50">
        <div className="flex max-sm:gap-2 sm:flex-wrap justify-around sm:justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <BurgerBtn isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <Link href="/" className="max-md:hidden">
              <Logo />
            </Link>
          </div>

          <div className="md:w-1/2">
            <Suspense fallback={<SearchFormSkeleton />}>
              <SearchForm loading={false} path="/search" />
            </Suspense>
          </div>

          <div className="flex items-center lg:order-2">
            <NotificationMenu />
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="z-20 bg-white"
                  radius="lg"
                  color="default"
                  variant="bordered"
                >
                  <VerticalDots />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions">
                <DropdownItem textValue="Login">
                  <LoginButton />
                </DropdownItem>
                <DropdownItem textValue="Theme">
                  <ThemeSwitcher />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>

      <SideBarMain isSidebarOpen={isMenuOpen} onOpenSidebar={setIsMenuOpen} />
    </>
  );
}

export default NavbarMain;
