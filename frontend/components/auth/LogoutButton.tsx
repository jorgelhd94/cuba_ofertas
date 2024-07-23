import { logout } from "@/lib/actions/logout";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { toast } from "react-toastify";

const LogoutButton: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const signOut = async () => {
    await logout();
    router.push("/");
    toast.success("Sesión cerrada correctamente", { position: "bottom-right" });
  };

  const handleClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={signOut}>
      <div className="flex items-center gap-4" onClick={handleClick}>
        <Button type="button" isIconOnly variant="light">
          <FaDoorOpen size={24} />
        </Button>
        <p className="text-medium">Cerrar sesión</p>
      </div>
    </form>
  );
};

export default LogoutButton;
