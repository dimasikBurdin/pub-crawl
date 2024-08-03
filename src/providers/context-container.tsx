import { FC, PropsWithChildren } from "react";
import { YMapProvider } from "./ymap-provider/ymap-provider";

const providers = [YMapProvider];

export const ContextContainer: FC<PropsWithChildren> = ({ children }) => {
  return providers.reduce(
    (prev, Current) => <Current>{prev}</Current>,
    <>{children}</>
  );
};
