import { Badge, Button } from "@nextui-org/react";
import { FaBell } from "react-icons/fa6";

type Props = {};

const NotificationMenu = (props: Props) => {
  return (
    <Badge content="1" shape="circle" color="danger">
      <Button as="button" radius="full" isIconOnly variant="light">
        <FaBell size={24} />
      </Button>
    </Badge>
  );
};

export default NotificationMenu;
