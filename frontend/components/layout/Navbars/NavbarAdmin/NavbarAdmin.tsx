"use client";

import LogoutButton from "@/components/auth/LogoutButton";
import NotificationMenu from "@/components/notifications/NotificationMenu/NotificationMenu";
import BurgerBtn from "@/components/shared/buttons/BurgerBtn";
import Logo from "@/components/shared/logo";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import DrawerSidebarAdmin from "../../SidebarAdmin/DrawerSidebarAdmin";

function NavbarAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 sticky left-0 right-0 top-0 z-50">
        <div className="flex max-sm:gap-2 sm:flex-wrap justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="lg:hidden">
              <BurgerBtn
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>

            <Link href="/" className="max-md:hidden">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center lg:order-2 gap-2">
            <NotificationMenu />
            <Dropdown>
              <DropdownTrigger className="cursor-pointer">
                <Avatar
                  icon={<AvatarIcon />}
                  classNames={{
                    base: "bg-gradient-to-r from-primary-100 to-primary-200",
                    icon: "text-black/80 dark:text-white",
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions">
                <DropdownItem textValue="Theme">
                  <ThemeSwitcher />
                </DropdownItem>
                <DropdownItem textValue="Login">
                  <LogoutButton />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>

      <DrawerSidebarAdmin isSidebarOpen={isMenuOpen} onOpenSidebar={setIsMenuOpen} />
    </>
  );
}

export default NavbarAdmin;
