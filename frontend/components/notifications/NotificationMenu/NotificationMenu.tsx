"use client";
import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Badge, Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import useSWR from "swr";
import NotificationDrawer from "../NotificationDrawer/NotificationDrawer";

type Props = {};

const NotificationMenu = (props: Props) => {
  const { data, error, isLoading } = useSWR(
    getApiUrl("/notifications"),
    fetcher
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isMenuOpen && !event.target.closest(".notification-menu")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative notification-menu">
      <Button
        isLoading={isLoading}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        isIconOnly
        className="p-6 bg-transparent"
        variant="flat"
      >
        <Badge
          content={data?.length}
          shape="circle"
          color="danger"
          isInvisible={error || data?.length === 0}
        >
          <FaBell size={24} />
        </Badge>
      </Button>

      <NotificationDrawer
        isOpen={isMenuOpen}
        isLoading={isLoading}
        isError={error}
        notifications={data}
        handleClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default NotificationMenu;
