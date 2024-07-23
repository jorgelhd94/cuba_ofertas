import React from "react";
import { Drawer } from "flowbite-react";
import SidebarAdmin from "./SidebarAdmin";

type Props = {
  isSidebarOpen: boolean;
  onOpenSidebar: Function;
};

const DrawerSidebarAdmin = (props: Props) => {
  return (
    <>
      <Drawer
        open={props.isSidebarOpen}
        onClose={() => props.onOpenSidebar(false)}
        className="w-max p-0"
      >
        <Drawer.Items>
          <SidebarAdmin standalone={false} />
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default DrawerSidebarAdmin;
