import { cn } from "../../lib/utils";
import { SlidersHorizontal } from "lucide-react";

import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./accordion";

type AccordionFilterProps = {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: Boolean;
  className?: string;
};

export function AccordionFilter({
  title = "Filtros",
  children,
  defaultOpen = false,
  className,
}: AccordionFilterProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? "filters" : undefined}
      className={cn("w-fill", className)}
    >
      <AccordionItem
        value="filters"
        className="roundex-xl border border-border bg-card px-4 last:border"
      >
        <AccordionTrigger className="items-center py-4 hover:no-underline">
          <span className="flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            {title}
          </span>
        </AccordionTrigger>

        <AccordionContent className="pt-2 pb-4">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
