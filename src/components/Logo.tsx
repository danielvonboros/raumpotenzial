import Image from "next/image";
import LogoLightWide from "@/assets/LogoLightWide.svg";
import LogoDarkWide from "@/assets/LogoDarkWide.svg";

interface LogoProps {
  /** "tinte" für hellen Grund, "leinen" für dunklen Grund */
  variant?: "tinte" | "leinen";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "tinte", className, priority }: LogoProps) {
  return (
    <Image
      src={variant === "tinte" ? LogoLightWide : LogoDarkWide}
      alt="raumideenwerk"
      className={className}
      priority={priority}
    />
  );
}
