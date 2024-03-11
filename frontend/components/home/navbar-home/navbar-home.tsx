'use client';

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../shared/logo";
import { ThemeSwitcher } from "../../shared/theme-switcher";

function NavbarHome() {
  const [blurred, setBlurred] = useState(false);

  const onScroll = (position: number) => {
    if (position > 20) {
      setBlurred(true);
    } else {
      setBlurred(false);
    }
  }

  return (
    <Navbar maxWidth="xl" onScrollPositionChange={onScroll} isBlurred={blurred} className="fixed bg-transparent">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent justify="end" className="align-items-center">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarHome;
