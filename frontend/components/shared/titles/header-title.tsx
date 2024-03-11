import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const HeaderTitle: React.FC<Props> = ({ children, className }) => {
  return (
    <h1
      className={clsx(
        "text-5xl font-bold leading-tight bg-gradient-to-br from-gray-950 to-gray-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default HeaderTitle;
