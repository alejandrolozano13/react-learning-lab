import { cn } from "../../lib/utils";

type FormFieldProps = {
  children: React.ReactNode;
  className?: string;
};

export function FormField({ children, className }: FormFieldProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}