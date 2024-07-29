"use client";
import { Alert } from "flowbite-react";
import React, { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const AlertMsg = (props: Props) => {
  const [hideMsg, setHideMsg] = useState(false);

  return (
    <Alert
      color="info"
      className={hideMsg ? "hidden" : "md:w-max"}
      onDismiss={() => setHideMsg(true)}
    >
      {props.children}
    </Alert>
  );
};

export default AlertMsg;
