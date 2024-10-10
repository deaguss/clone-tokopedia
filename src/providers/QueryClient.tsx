"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QueryProviders: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviders;
