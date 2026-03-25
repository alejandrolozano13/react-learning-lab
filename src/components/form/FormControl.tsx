import { Slot } from "@radix-ui/react-slot";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type FormControlProps = {
    children: ReactNode;
    className?: string;
    asChild?: boolean;
}

export function FormControl({
    children,
    className,
    asChild = false
}: FormControlProps) {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp className={cn(!asChild && "w-full", className)}>
            {children}
        </Comp>
    )
}