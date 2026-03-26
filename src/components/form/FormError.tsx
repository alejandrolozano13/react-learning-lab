import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";

type FormErrorProps = {
  name: string;
  className?: string;
};

export function FormError({ name, className }: FormErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return !error ? null : (
    <p className={cn("text-sm text-red-500", className)}>{String(error.message)}</p>
  );
}