import type { ReactNode } from "react";

import {
    FormProvider,
    type FieldValues,
    type UseFormReturn
} from "react-hook-form";

type FormRootProps<
  TFieldValues extends FieldValues,
  TContext = undefined,
  TTransformedValues = TFieldValues,
> = {
  methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  children: ReactNode;
};

export function FormRoot<
  TFieldValues extends FieldValues,
  TContext = undefined,
  TTransformedValues = TFieldValues,
>({
  methods,
  onSubmit,
  className,
  children,
}: FormRootProps<TFieldValues, TContext, TTransformedValues>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}