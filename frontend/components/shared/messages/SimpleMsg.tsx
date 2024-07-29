import React from "react";

type Props = {
  message: string;
  type?: "error" | "normal";
};

const SimpleMsg = (props: Props) => {
  const getTextColor = () => {
    if (props.type === "error") {
      return "text-danger";
    }
    return "text-default-400";
  };

  return (
    <div className="w-full">
      <p className={"text-sm " + getTextColor()}>{props.message}</p>
    </div>
  );
};

export default SimpleMsg;
