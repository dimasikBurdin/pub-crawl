import { FC, PropsWithChildren, createContext } from "react";

export const YMapContext = createContext<any>(3);

export const YMapProvider: FC<PropsWithChildren> = ({ children }) => {
  return <YMapContext.Provider value={3}>{children}</YMapContext.Provider>;
};
