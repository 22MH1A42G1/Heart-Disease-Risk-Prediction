import { cn } from "@/lib/utils";

interface BlurBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "mesh" | "gradient";
}

export function BlurBackground({
  children,
  className,
  variant = "default",
}: BlurBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Animated background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Floating orbs */}
        <div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/2 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-10 right-1/4 w-64 h-64 bg-heart/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        
        {/* Mesh gradient overlay */}
        {variant === "mesh" && (
          <div className="absolute inset-0 bg-mesh opacity-50" />
        )}
        
        {/* Animated gradient overlay */}
        {variant === "gradient" && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 bg-400 animate-gradient-shift"
          />
        )}
        
        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {children}
    </div>
  );
}
