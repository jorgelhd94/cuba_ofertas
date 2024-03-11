import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const GradientTitle: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-4xl font-bold mb-3 leading-tight bg-gradient-to-br from-gray-950 to-gray-500 dark:from-white dark:to-zinc-500  bg-clip-text text-transparent">
      {children}
    </h2>
  );
};

export default GradientTitle;
