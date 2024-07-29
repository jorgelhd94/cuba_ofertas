import { createContext } from "react";
import { IComparisonZone } from "../interfaces/IComparisonZone";

export const ComparisonZoneContext = createContext<IComparisonZone | null>(
  null
);
