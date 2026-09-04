type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className = "h-16 w-auto", compact = false }: LogoProps) {
  return (
    <img
      src={compact ? "/logo-web.png" : "/logo.png"}
      alt="WAGAIA — silhuetas de mulheres, punhos erguidos, megafone e wordmark"
      className={className}
      width={compact ? 180 : 320}
      height={compact ? 145 : 263}
    />
  );
}
