import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export function FormLabel({ children, className, ...props }: FormLabelProps) {
  return (
    <label className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </label>
  );
}