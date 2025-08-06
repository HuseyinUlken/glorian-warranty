import * as React from "react"

import { cn } from "@/lib/utils"
import { AITextarea } from "./ai-textarea"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  supportAi?: boolean;
  autoImprove?: boolean;
}

function Textarea({ className, supportAi = false, autoImprove = true, ...props }: TextareaProps) {
  // Eğer supportAi true ise AITextarea komponentini kullan
  if (supportAi && false) {
    return (
      <AITextarea
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-t-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        autoImprove={autoImprove}
        {...props}
      />
    )
  }

  // Normal textarea komponentini kullan
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
