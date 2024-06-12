"use client";
import { Drawer, Sidebar } from "flowbite-react";
import Link from "next/link";
import { HiChartPie, HiSearch } from "react-icons/hi";

type Props = {
  isSidebarOpen: boolean;
  onCloseSidebar: Function;
};

const SideBarMain = (props: Props) => {
  return (
    <>
      <Drawer
        open={props.isSidebarOpen}
        onClose={() => props.onCloseSidebar(false)}
        
      >
        <Drawer.Items className="pt-14">
            <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
              <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col">
                  <Link href="/">
                    <Sidebar.Item icon={HiChartPie}>Inicio</Sidebar.Item>
                  </Link>
                  <Link href="/search">
                    <Sidebar.Item icon={HiSearch}>
                      Búsqueda general
                    </Sidebar.Item>
                  </Link>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default SideBarMain;
