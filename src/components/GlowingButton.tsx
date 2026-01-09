import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlowingButtonProps extends ButtonProps {
  glowColor?: "primary" | "heart" | "health";
}

const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, glowColor = "primary", children, ...props }, ref) => {
    const glowClasses = {
      primary: "glow-button bg-primary hover:bg-primary/90",
      heart: "glow-button-heart bg-secondary hover:bg-secondary/90",
      health: "glow-button-health bg-accent hover:bg-accent/90 text-foreground",
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300 font-semibold",
          glowClasses[glowColor],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity" />
      </Button>
    );
  }
);

GlowingButton.displayName = "GlowingButton";

export { GlowingButton };
