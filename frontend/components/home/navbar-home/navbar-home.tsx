"use client";

import { SearchIcon } from "@/components/shared/icons/SearchIcon";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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

  const onScroll = (position: number) => {
    if (position > 20) {
      setBlurred(true);
    } else {
      setBlurred(false);
    }
  };

  return (
    <Navbar
      maxWidth="xl"
      onScrollPositionChange={onScroll}
      isBlurred={blurred}
      className="fixed bg-transparent"
    >
      <NavbarBrand>
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>

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
    </Navbar>
  );
}

export default NavbarHome;
