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
import { useRouter } from "next/navigation";

function NavbarHome() {
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
            type="button"
            isIconOnly
            color="secondary"
            aria-label="Like"
            onClick={() => router.push("/search")}
          >
            <SearchIcon color="white" />
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
