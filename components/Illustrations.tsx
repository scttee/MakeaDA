import React from "react";

type Props = { label: string; accent?: "primary" | "secondary" };

export const IsoIcon = ({ label, accent = "primary" }: Props) => (
  <svg viewBox="0 0 120 80" role="img" aria-label={label} className="h-28 w-full">
    <rect x="15" y="20" width="60" height="40" fill="white" stroke="black" strokeWidth="2" />
    <polygon points="15,20 45,5 105,5 75,20" fill="white" stroke="black" strokeWidth="2" />
    <polygon points="75,20 105,5 105,45 75,60" fill="white" stroke="black" strokeWidth="2" />
    <circle cx="35" cy="40" r="6" fill={`var(--color-${accent})`} />
  </svg>
);
