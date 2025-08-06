import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroPillProps {
  href: string
  label: string
  announcement?: string
  className?: string
  isExternal?: boolean
}

export function HeroPill({ 
  href, 
  label, 
  announcement = "📣 Announcement",
  className,
}: HeroPillProps) {
  return (
    <motion.button
      className={cn(
        "flex w-auto items-center space-x-2 rounded-full",
        "bg-primary/20 ring-1 ring-accent",
        "px-2 py-1 whitespace-pre",
        className
      )}
      initial={{ opacity: 1, y:0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={cn(
        "w-fit rounded-full bg-green-50 px-2 py-0.5",
        "text-xs font-medium text-primary sm:text-sm",
        "text-center"
      )}>
        {announcement}
      </div>
      <p className="text-xs font-semibold text-primary sm:text-sm">
        {label}
      </p>
    </motion.button>
  )
}