import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type FormActionsProps = {
  children: ReactNode;
  className?: string;
};

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <footer className={cn("mt-auto border-t border-black/10 pt-4", className)}>
      {children}
    </footer>
  );
}