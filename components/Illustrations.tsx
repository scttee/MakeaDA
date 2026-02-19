import React from "react";

type Accent = "primary" | "secondary";

const BaseIso = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox="0 0 160 110" role="img" aria-label={label} className="h-32 w-full">
    <polygon points="20,68 80,36 140,68 80,100" fill="white" stroke="black" strokeWidth="2" />
    <polygon points="20,68 20,42 80,10 80,36" fill="white" stroke="black" strokeWidth="2" />
    <polygon points="140,68 140,42 80,10 80,36" fill="white" stroke="black" strokeWidth="2" />
    {children}
  </svg>
);

export const JourneyIllustration = ({ label, name, accent = "primary" }: { label: string; name: string; accent?: Accent }) => {
  const fill = `var(--color-${accent})`;

  const featureByName: Record<string, React.ReactNode> = {
    IsoBuild: <rect x="65" y="44" width="28" height="24" fill={fill} stroke="black" strokeWidth="2" />,
    IsoRenovate: <path d="M60 64 L84 40 L98 54 L74 78 Z" fill={fill} stroke="black" strokeWidth="2" />,
    IsoExtension: <><rect x="54" y="52" width="28" height="18" fill={fill} stroke="black" strokeWidth="2" /><rect x="86" y="52" width="18" height="12" fill="white" stroke="black" strokeWidth="2" /></>,
    IsoGranny: <><rect x="56" y="48" width="20" height="18" fill={fill} stroke="black" strokeWidth="2" /><rect x="84" y="55" width="16" height="14" fill="white" stroke="black" strokeWidth="2" /></>,
    IsoDeck: <><line x1="48" y1="78" x2="112" y2="46" stroke="black" strokeWidth="2" /><circle cx="58" cy="70" r="5" fill={fill} /></>,
    IsoPool: <ellipse cx="80" cy="62" rx="28" ry="14" fill={fill} stroke="black" strokeWidth="2" />,
    IsoDemo: <><path d="M58 66 L70 50 L84 58 L74 72 Z" fill={fill} stroke="black" strokeWidth="2" /><line x1="90" y1="46" x2="104" y2="60" stroke="black" strokeWidth="2" /></>,
    IsoExterior: <><rect x="56" y="48" width="48" height="20" fill="white" stroke="black" strokeWidth="2" /><rect x="68" y="54" width="24" height="10" fill={fill} stroke="black" strokeWidth="1.5" /></>,
    IsoHeritage: <><rect x="54" y="48" width="52" height="22" fill="white" stroke="black" strokeWidth="2" /><circle cx="80" cy="59" r="6" fill={fill} stroke="black" strokeWidth="2" /></>,
    IsoFitout: <><rect x="58" y="48" width="44" height="20" fill={fill} stroke="black" strokeWidth="2" /><line x1="58" y1="58" x2="102" y2="58" stroke="black" strokeWidth="1.5" /></>,
    IsoUse: <><path d="M56 64 h48" stroke="black" strokeWidth="2" /><path d="M92 54 l12 10 -12 10" stroke="black" strokeWidth="2" fill="none" /><circle cx="66" cy="64" r="6" fill={fill} /></>,
    IsoOutdoor: <><rect x="56" y="62" width="26" height="10" fill={fill} stroke="black" strokeWidth="2" /><rect x="86" y="58" width="18" height="8" fill="white" stroke="black" strokeWidth="2" /></>,
    IsoSign: <><rect x="56" y="40" width="48" height="16" fill={fill} stroke="black" strokeWidth="2" /><line x1="80" y1="56" x2="80" y2="76" stroke="black" strokeWidth="2" /></>,
    IsoHours: <><circle cx="80" cy="58" r="14" fill="white" stroke="black" strokeWidth="2" /><line x1="80" y1="58" x2="80" y2="50" stroke={fill} strokeWidth="2" /><line x1="80" y1="58" x2="88" y2="58" stroke={fill} strokeWidth="2" /></>,
    IsoModify: <><rect x="56" y="50" width="44" height="18" fill="white" stroke="black" strokeWidth="2" /><path d="M70 58 h24" stroke={fill} strokeWidth="2" /><path d="M70 63 h18" stroke={fill} strokeWidth="2" /></>,
    IsoBuildStart: <><path d="M56 68 l20-20 10 10 18-18" stroke={fill} strokeWidth="3" fill="none" /><circle cx="104" cy="40" r="4" fill={fill} /></>,
    IsoLookup: <><circle cx="74" cy="56" r="10" fill="white" stroke="black" strokeWidth="2" /><line x1="82" y1="64" x2="94" y2="76" stroke="black" strokeWidth="2" /><circle cx="74" cy="56" r="4" fill={fill} /></>,
    IsoTalk: <><rect x="56" y="48" width="40" height="18" fill="white" stroke="black" strokeWidth="2" /><path d="M68 66 l-4 8 12-8" fill="white" stroke="black" strokeWidth="2" /><circle cx="70" cy="57" r="2" fill={fill} /><circle cx="78" cy="57" r="2" fill={fill} /></>,
    IsoStrata: <><rect x="56" y="44" width="18" height="26" fill={fill} stroke="black" strokeWidth="2" /><rect x="78" y="50" width="18" height="20" fill="white" stroke="black" strokeWidth="2" /><rect x="100" y="56" width="18" height="14" fill="white" stroke="black" strokeWidth="2" /></>
  };

  return <BaseIso label={label}>{featureByName[name] ?? featureByName.IsoBuild}</BaseIso>;
};
