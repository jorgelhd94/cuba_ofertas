"use client";

import { SearchIcon } from "@/components/shared/icons/SearchIcon";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import Logo from "../../shared/logo";
import { ThemeSwitcher } from "../../shared/theme-switcher";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function NavbarHome() {
  const pathname = usePathname();
  const [blurred, setBlurred] = useState(false);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onScroll = (position: number) => {
    if (position > 20) {
      setBlurred(true);
    } else {
      setBlurred(false);
    }
  };

  const menuItems = ["Zonas de comparación"];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      onScrollPositionChange={onScroll}
      isBlurred={blurred}
      className="fixed bg-transparent"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            href="#"
            className="text-primary-700 hover:border-2 border-secondary rounded-lg p-2 hover:text-secondary-500"
          >
            Zonas de comparación
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="align-items-center">
        <NavbarItem>
          <Button
            variant={`${pathname === "/search" ? "solid" : "bordered"}`}
            type="button"
            isIconOnly
            color={`${pathname === "/search" ? "secondary" : "default"}`}
            aria-label="Like"
            className="hover:border-default"
            onClick={() => router.push("/search")}
          >
            <Link href="/search">
              <SearchIcon
                color={`${pathname === "/search" ? "white" : "black"}`}
              />
            </Link>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-4 px-0">
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="text-primary border-b-2 pb-4 px-8" key={`${item}-${index}`}>
            <Link
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarHome;
