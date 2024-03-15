import { createContext } from "react";
import { IProduct } from "../interfaces/IProduct";

export const PinProductContext = createContext({
    pinProduct: null as IProduct | null,
    setPinProduct: (product: IProduct | null) => {},
   });
