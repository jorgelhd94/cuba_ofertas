import { Button } from "flowbite-react";
import React from "react";
import { HiMenu } from "react-icons/hi";

type Props = {
    isMenuOpen: boolean;
    setIsMenuOpen: Function;
};

const BurgerBtn = (props: Props) => {
  return (
    <Button
      size="xs"
      outline={!props.isMenuOpen}
      gradientDuoTone="purpleToBlue"
      onClick={() => props.setIsMenuOpen(!props.isMenuOpen)}
    >
      <HiMenu className="h-6 w-6" />
    </Button>
  );
};

export default BurgerBtn;
