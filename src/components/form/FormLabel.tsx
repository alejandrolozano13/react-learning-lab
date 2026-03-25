type FormLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export function FormLabel({ htmlFor, children }: FormLabelProps) {
  return <label htmlFor={htmlFor}>{children}</label>;
}