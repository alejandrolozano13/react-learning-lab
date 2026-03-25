import { useFormContext } from "react-hook-form";

type FormErrorProps = {
  name: string;
};

export function FormError({ name }: FormErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return !error ? null : (
    <p className="text-sm text-red-500">{String(error.message)}</p>
  );
}