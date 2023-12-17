import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const MainContainerLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default MainContainerLayout;
