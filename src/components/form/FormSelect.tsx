import {
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type FormSelectProps<TFieldValues extends FieldValues> =
  SelectHTMLAttributes<HTMLSelectElement> & {
    name: Path<TFieldValues>;
    children: ReactNode;
  };

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  className,
  children,
  ...props
}: FormSelectProps<TFieldValues>) {
  const { register } = useFormContext<TFieldValues>();

  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border px-4 text-sm outline-none",
        className,
      )}
      {...register(name)}
      {...props}
    >
      {children}
    </select>
  );
}