import { createContext } from "react";

type LoginModalContexttType = {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
};

export const LoginModalContextt = createContext<LoginModalContexttType>({
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
});
