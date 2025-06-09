import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = {
  default: "bg-[#2C74B3] text-white hover:bg-[#205295]",
  ghost: "hover:bg-transparent",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
};

export const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false,
  ...props 
}, ref) => {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button"; 