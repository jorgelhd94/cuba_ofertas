import { usePathname } from "next/navigation";
import React from "react";
import { HiChartPie, HiDatabase } from "react-icons/hi";
import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import Logo from "@/components/shared/logo";
import Link from "next/link";
import classNames from "classnames";

type Props = {
  onOpenSidebar?: Function;
  standalone?: boolean;
  className?: string;
};

const customSidebarTheme: CustomFlowbiteTheme["sidebar"] = {
  item: {
    base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-indigo-200 dark:text-white dark:hover:bg-gray-700",
    active: "bg-indigo-100 dark:bg-gray-700",
    icon: {
      base: "h-5 w-5 flex-shrink-0 text-primary-600 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white",
    },
  },
};

const SidebarAdmin = (props: Props) => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      label: "Inicio",
      icon: HiChartPie,
      path: "/",
    },
    {
      label: "Actualizaciones",
      icon: HiDatabase,
      path: "/updates",
    },
  ];

  const classes = classNames(
    "w-64 h-screen pt-16 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700",
    {
      "fixed top-0 left-0 z-40": props.standalone,
    },
    props.className
  );

  return (
    <Sidebar className={classes} theme={customSidebarTheme}>
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
              onClick={() => props.onOpenSidebar && props.onOpenSidebar(false)}
            >
              {item.label}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarAdmin;
