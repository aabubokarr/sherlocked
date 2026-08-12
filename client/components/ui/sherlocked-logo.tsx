import type { ImgHTMLAttributes } from "react";
import Image from "next/image";

const ICON_ASPECT = 412 / 384;

const logoSrc =
  process.env.NODE_ENV === "production" &&
  process.env.GITHUB_ACTIONS === "true"
    ? "/sherlocked/icon.svg"
    : "/icon.svg";

type SherlockedLogoProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> & {
  size?: number;
  className?: string;
};

export function SherlockedLogo({
  size = 32,
  className,
  ...props
}: SherlockedLogoProps) {
  return (
    <Image
      src={logoSrc}
      alt="Sherlocked"
      width={size}
      height={Math.round(size * ICON_ASPECT)}
      className={className}
      {...props}
    />
  );
}
