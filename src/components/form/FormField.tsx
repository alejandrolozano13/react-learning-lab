type FormFieldProps = {
  children: React.ReactNode;
  className?: string;
};

export function FormField({ children, className }: FormFieldProps) {
  return <div className={className}>{children}</div>;
}