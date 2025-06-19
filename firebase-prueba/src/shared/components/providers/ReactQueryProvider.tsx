"use client"

import { type ReactNode, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/shared/lib/reactQuery";

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  const [queryClient] = useState(createQueryClient);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
