import { useFormContext, type FieldValues, type Path } from "react-hook-form";

import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type FormTextareaProps<TFieldValues extends FieldValues> =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: Path<TFieldValues>;
  };

export function FormTextarea<TFieldValues extends FieldValues>({
  name,
  className,
  ...props
}: FormTextareaProps<TFieldValues>) {
  const { register } = useFormContext<TFieldValues>();

  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xl border px-4 py-3 text-sm outline-none",
        className,
      )}
      {...register(name)}
      {...props}
    />
  );
}