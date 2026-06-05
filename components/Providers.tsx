"use client";

import { Toaster } from "sonner";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          classNames: {
            toast: "border border-slate-200 bg-white text-slate-900",
          },
        }}
      />
    </LanguageProvider>
  );
}
