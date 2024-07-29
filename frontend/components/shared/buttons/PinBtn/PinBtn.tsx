import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { PinIcon } from "../../icons/PinIcon";

type PinBtnProps = {
  isActive?: boolean;
  handleClick?: Function;
};

export const PinBtn: React.FC<PinBtnProps> = (props) => {
  const handleClickBtn = () => {
    if (props.handleClick) {
      props.handleClick(!props.isActive);
    }
  };
  return (
    <Tooltip
      showArrow={true}
      content={props.isActive ? "Producto fijado" : "Fijar producto"}
    >
      <Button
        onClick={handleClickBtn}
        isIconOnly
        className={`z-20 ${
          props.isActive ? "bg-secondary" : "bg-white"
        }`}
        radius="lg"
        color={props.isActive ? "secondary" : "default"}
        variant={props.isActive ? "solid" : "bordered"}
      >
        <PinIcon isActive={props.isActive || false} />
      </Button>
    </Tooltip>
  );
};
