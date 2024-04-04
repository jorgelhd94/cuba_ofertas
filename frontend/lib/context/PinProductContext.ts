import { createContext } from "react";
import { IProduct } from "../interfaces/IProduct";

interface PinProductContextType {
  pinProduct: IProduct | null;
  setPinProduct?: (product: IProduct | null) => void;
}

export const PinProductContext = createContext<PinProductContextType>({
  pinProduct: null,
});
