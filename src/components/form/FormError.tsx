import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { cn } from "../../lib/utils";

type FormErrorProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  className?: string;
};

export function FormError<TFieldValues extends FieldValues>({
  name,
  className,
}: FormErrorProps<TFieldValues>) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = String(name)
    .split(".")
    .reduce<any>((current, key) => current?.[key], errors);

  return !error ? null : (
    <p className={cn("text-sm text-red-500", className)}>
      {String(error.message)}
    </p>
  );
}
