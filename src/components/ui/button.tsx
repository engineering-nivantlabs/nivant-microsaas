import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1A1A2E] text-white hover:scale-[1.02] hover:bg-[#2a2a4e] shadow-lg",
        green: "bg-curriculum text-white hover:scale-[1.02] hover:bg-[#258a4f] shadow-lg",
        purple: "bg-therapy text-white hover:scale-[1.02] hover:bg-[#6b4e97] shadow-lg",
        blue: "bg-compliance text-white hover:scale-[1.02] hover:bg-[#245a9a] shadow-lg",
        coral: "bg-inventory text-white hover:scale-[1.02] hover:bg-[#d45c2a] shadow-lg",
        outline: "border-2 border-[#1A1A2E] bg-transparent text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
