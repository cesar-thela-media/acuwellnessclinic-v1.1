import { cn } from "@/lib/utils";

interface DotBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const DotBackground = ({ children, className }: DotBackgroundProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[20px_20px]",
          "bg-[radial-gradient(var(--color-blue-500)_1px,transparent_1px)]",
        )}
      />
      {/* Linear gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background mask-[linear-gradient(to_bottom,black,transparent)]" />
      {/* Blur effect at the bottom */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-sm mask-[linear-gradient(to_bottom,transparent_60%,black)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DotBackground;
