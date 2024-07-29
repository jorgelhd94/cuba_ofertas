import { createContext } from "react";
import { IProduct } from "../interfaces/IProduct";

type PinProductContextType = {
  pinProduct: IProduct | null;
  setPinProduct?: (product: IProduct | null) => void;
};

export const PinProductContext = createContext<PinProductContextType>({
  pinProduct: null,
});
