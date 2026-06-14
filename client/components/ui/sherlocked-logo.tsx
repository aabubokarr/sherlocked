import type { ImgHTMLAttributes } from "react";

const ICON_ASPECT = 412 / 384;

type SherlockedLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  size?: number;
};

/** Renders `app/icon.svg` — the single brand mark used as favicon and in-app logo. */
export function SherlockedLogo({ size = 32, className, ...props }: SherlockedLogoProps) {
  return (
    <img
      src="/icon.svg"
      alt="Sherlocked"
      width={size}
      height={Math.round(size * ICON_ASPECT)}
      className={className}
      {...props}
    />
  );
}
