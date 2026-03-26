import { useFormContext, type FieldValues, type Path } from "react-hook-form";

import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type FormInputProps<TFieldValues extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    name: Path<TFieldValues>;
  };

export function FormInput<TFieldValues extends FieldValues>({
  name,
  className,
  ...props
}: FormInputProps<TFieldValues>) {
  const { register } = useFormContext<TFieldValues>();

  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-border px-4 outline-none",
        className,
      )}
      {...register(name)}
      {...props}
    />
  );
}