import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper/PublicLayoutWrapper";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = (props: Props) => {
  return <PublicLayoutWrapper>{props.children}</PublicLayoutWrapper>;
};

export default PublicLayout;
