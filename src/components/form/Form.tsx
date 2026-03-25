import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

type FormProps<
  TFieldsValues extends FieldValues,
  TContext = undefined,
  TTransformedValues = TFieldsValues,
> = {
  methods: UseFormReturn<TFieldsValues, TContext, TTransformedValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  className?: string;
};

export function Form<
  TFieldValues extends FieldValues,
  TContext = undefined,
  TTransformedValues = TFieldValues,
>({
  methods,
  onSubmit,
  children,
  className
}: FormProps<TFieldValues, TContext, TTransformedValues>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={className}>{children}</form>
    </FormProvider>
  );
}