import AdminLayoutWrapper from "@/components/layout/AdminLayoutWrapper/AdminLayoutWrapper";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = (props: Props) => {
  return <AdminLayoutWrapper>{props.children}</AdminLayoutWrapper>;
};

export default AdminLayout;
