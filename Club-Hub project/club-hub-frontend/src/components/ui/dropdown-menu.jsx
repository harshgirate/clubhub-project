import React from 'react';
import { cn } from '../../lib/utils';

export const DropdownMenu = ({ children }) => {
  return <div className="relative">{children}</div>;
};

export const DropdownMenuTrigger = React.forwardRef(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? "span" : "button";
  return <Comp ref={ref} className={className} {...props} />;
});

export const DropdownMenuContent = ({ children, className, align = "center", sideOffset = 4 }) => {
  return (
    <div className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "animate-in data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    )}>
      {children}
    </div>
  );
};

export const DropdownMenuItem = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}); 