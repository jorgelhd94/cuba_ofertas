import { createContext } from "react";
import { IProduct } from "../interfaces/IProduct";

export const CreateNewZoneContext = createContext({
    handleNewZone: (product: IProduct | null) => {},
   });
