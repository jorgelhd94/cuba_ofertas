"use client";

import NotificationMenu from "@/components/notifications/NotificationMenu/NotificationMenu";
import { SearchForm } from "@/components/search/SearchForm/SearchForm";
import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Logo from "../../shared/logo";
import { ThemeSwitcher } from "../../shared/theme-switcher";
import SideBarMain from "../SideBarMain/SideBarMain";
import SearchFormSkeleton from "@/components/shared/skeletons/SearchFormSkeleton";

function NavbarMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchText = (searchText: string) => {
    const query = getQueryString(searchParams.toString(), {
      name: "q",
      value: searchText,
    });

    router.push(`/search?${query}`);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 sticky left-0 right-0 top-0 z-50">
        <div className="flex max-sm:gap-2 sm:flex-wrap justify-around sm:justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <Button
              size="xs"
              outline={!isMenuOpen}
              gradientDuoTone="purpleToBlue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HiMenu className="h-6 w-6" />
            </Button>

            <Link href="/" className="max-md:hidden">
              <Logo />
            </Link>
          </div>

          <div className="md:w-1/2">
            <Suspense fallback={<SearchFormSkeleton />}>
              <SearchForm
                handleSearchText={handleSearchText}
                loading={false}
                standalone
              />
            </Suspense>
          </div>

          <div className="flex items-center lg:order-2 gap-4">
            <NotificationMenu />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <SideBarMain isSidebarOpen={isMenuOpen} onOpenSidebar={setIsMenuOpen} />
    </>
  );
}

export default NavbarMain;
