import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function MegaphoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 28c8-2 18-10 36-18 2 10 2 22 0 34-18-6-28-12-36-14v-2z"
        fill="#F9C7C7"
        stroke="#000"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M12 28v12l8 2v-10" stroke="#000" strokeWidth="3" fill="#000" />
      <path d="M20 32h6" stroke="#FEE3E2" strokeWidth="2" />
      <circle cx="48" cy="18" r="3" fill="#000" />
    </svg>
  );
}

export function FistIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M22 54V28c0-3 3-6 7-6h3c2 0 3 2 3 4v8h3c3 0 5 2 5 5v15c0 4-4 8-10 8h-3c-6 0-8-3-8-8z"
        fill="#000"
      />
      <path
        d="M32 22V14c0-3 3-6 7-6 3 0 6 3 6 6v16"
        stroke="#000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M18 34h8M18 40h8M18 46h8" stroke="#F9C7C7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M32 54C14 40 8 30 14 20c4-7 14-7 18-1 4-6 14-6 18 1 6 10 0 20-18 34z"
        fill="#F9C7C7"
        stroke="#000"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path
        d="M32 6l7 18h18l-14 11 5 19-16-12-16 12 5-19-14-11h18z"
        fill="#000"
      />
    </svg>
  );
}

export function CrownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 44l8-22 16 12 16-16 8 26H8z"
        fill="#F9C7C7"
        stroke="#000"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M10 48h44" stroke="#000" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <rect x="14" y="28" width="36" height="26" rx="6" fill="#FEE3E2" stroke="#000" strokeWidth="3" />
      <path d="M22 28v-8a10 10 0 0120 0v8" stroke="#000" strokeWidth="3" />
      <circle cx="32" cy="40" r="3" fill="#000" />
    </svg>
  );
}

export function ExclaimIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <circle cx="32" cy="32" r="22" fill="#F9C7C7" stroke="#000" strokeWidth="3" />
      <path d="M32 16v20" stroke="#000" strokeWidth="5" strokeLinecap="round" />
      <circle cx="32" cy="44" r="3" fill="#000" />
    </svg>
  );
}
