"use client";
import Logo from "@/components/shared/logo";
import { CustomFlowbiteTheme, Drawer, Sidebar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiChartPie,
  HiDatabase,
  HiSearch
} from "react-icons/hi";

type Props = {
  isSidebarOpen: boolean;
  onOpenSidebar: Function;
};

const customSidebarTheme: CustomFlowbiteTheme["sidebar"] = {
  item: {
    base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-700",
    active: "bg-indigo-100 dark:bg-gray-700",
    icon: {
      "base": "h-5 w-5 flex-shrink-0 text-primary-600 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white",
    }
  },
};

const SideBarMain = (props: Props) => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      label: "Inicio",
      icon: HiChartPie,
      path: "/",
    },
    {
      label: "Búsqueda general",
      icon: HiSearch,
      path: "/search",
    },
    {
      label: "Actualizaciones",
      icon: HiDatabase,
      path: "/updates",
    },
  ];

  return (
    <>
      <Drawer
        open={props.isSidebarOpen}
        onClose={() => props.onOpenSidebar(false)}
      >
        <Drawer.Items className="pt-16">
          <Sidebar
            className="[&>div]:bg-transparent [&>div]:p-0"
            theme={customSidebarTheme}
          >
            <div className="mb-4 md:hidden">
              <Logo />
            </div>
            <Sidebar.Items>
              <Sidebar.ItemGroup className="flex flex-col">
                {sidebarItems.map((item, index) => (
                  <Sidebar.Item
                    as={Link}
                    key={index}
                    active={pathname === item.path}
                    icon={item.icon}
                    href={item.path}
                    className="cursor-pointer"
                    onClick={() => props.onOpenSidebar(false)}
                  >
                    {item.label}
                  </Sidebar.Item>
                ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default SideBarMain;
