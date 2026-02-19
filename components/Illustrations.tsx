import React from "react";

type Accent = "primary" | "secondary";

const BaseIso = ({ children, label, accent }: { children: React.ReactNode; label: string; accent: Accent }) => {
  const accentColor = `var(--color-${accent})`;

  return (
    <svg viewBox="0 0 210 150" role="img" aria-label={label} className="h-36 w-full">
      <polygon points="26,106 106,66 186,106 106,146" fill="#f8fafc" stroke="black" strokeWidth="1.4" />
      <polygon points="26,106 26,42 106,2 106,66" fill="white" stroke="black" strokeWidth="1.4" />
      <polygon points="186,106 186,42 106,2 106,66" fill="white" stroke="black" strokeWidth="1.4" />
      <line x1="106" y1="2" x2="106" y2="66" stroke="black" strokeWidth="1.4" />
      <line x1="42" y1="112" x2="110" y2="78" stroke="#d1d5db" strokeWidth="1.2" />
      <line x1="110" y1="78" x2="170" y2="108" stroke="#d1d5db" strokeWidth="1.2" />
      <circle cx="46" cy="38" r="3" fill={accentColor} />
      {children}
    </svg>
  );
};

export const JourneyIllustration = ({ label, name, accent = "primary" }: { label: string; name: string; accent?: Accent }) => {
  const fill = `var(--color-${accent})`;

  const featureByName: Record<string, React.ReactNode> = {
    IsoBuild: <><rect x="66" y="72" width="48" height="34" fill="white" stroke="black" strokeWidth="1.4" /><polygon points="66,72 90,56 138,56 114,72" fill="#f8fafc" stroke="black" strokeWidth="1.4" /><rect x="82" y="82" width="14" height="12" fill={fill} stroke="black" strokeWidth="1.2" /></>,
    IsoRenovate: <><rect x="72" y="75" width="30" height="22" fill="white" stroke="black" strokeWidth="1.4" /><line x1="84" y1="76" x2="84" y2="98" stroke="black" strokeWidth="1.2" /><path d="M116 69 L134 79 L118 95 L100 85 Z" fill={fill} stroke="black" strokeWidth="1.4" /></>,
    IsoExtension: <><rect x="58" y="74" width="44" height="30" fill="white" stroke="black" strokeWidth="1.4" /><rect x="106" y="82" width="28" height="20" fill={fill} stroke="black" strokeWidth="1.4" /></>,
    IsoGranny: <><rect x="54" y="78" width="36" height="24" fill="white" stroke="black" strokeWidth="1.4" /><rect x="98" y="82" width="36" height="24" fill={fill} stroke="black" strokeWidth="1.4" /></>,
    IsoDeck: <><line x1="52" y1="110" x2="132" y2="70" stroke="black" strokeWidth="1.4" /><line x1="60" y1="114" x2="140" y2="74" stroke="black" strokeWidth="1.4" /><circle cx="78" cy="106" r="5" fill={fill} stroke="black" strokeWidth="1.2" /></>,
    IsoPool: <><ellipse cx="106" cy="100" rx="44" ry="18" fill={fill} stroke="black" strokeWidth="1.4" /><ellipse cx="106" cy="100" rx="32" ry="12" fill="white" stroke="black" strokeWidth="1" /></>,
    IsoDemo: <><path d="M70 102 L86 74 L102 90 L88 116 Z" fill={fill} stroke="black" strokeWidth="1.4" /><line x1="116" y1="72" x2="136" y2="92" stroke="black" strokeWidth="1.8" /><line x1="136" y1="72" x2="116" y2="92" stroke="black" strokeWidth="1.8" /></>,
    IsoExterior: <><rect x="64" y="76" width="84" height="28" fill="white" stroke="black" strokeWidth="1.4" /><rect x="78" y="84" width="24" height="12" fill={fill} stroke="black" strokeWidth="1.2" /><rect x="112" y="84" width="24" height="12" fill="#dbeafe" stroke="black" strokeWidth="1.2" /></>,
    IsoHeritage: <><rect x="64" y="72" width="78" height="34" fill="white" stroke="black" strokeWidth="1.4" /><polygon points="64,72 103,56 142,72" fill="#f8fafc" stroke="black" strokeWidth="1.4" /><circle cx="103" cy="89" r="8" fill={fill} stroke="black" strokeWidth="1.2" /></>,
    IsoFitout: <><rect x="68" y="74" width="76" height="30" fill="white" stroke="black" strokeWidth="1.4" /><line x1="68" y1="88" x2="144" y2="88" stroke="black" strokeWidth="1.2" /><rect x="96" y="80" width="20" height="8" fill={fill} stroke="black" strokeWidth="1" /></>,
    IsoUse: <><path d="M64 100 H120" stroke="black" strokeWidth="1.8" /><path d="M108 88 L124 100 L108 112" stroke="black" strokeWidth="1.8" fill="none" /><rect x="74" y="90" width="16" height="12" fill={fill} stroke="black" strokeWidth="1.2" /></>,
    IsoOutdoor: <><rect x="66" y="94" width="32" height="14" fill={fill} stroke="black" strokeWidth="1.4" /><rect x="106" y="88" width="28" height="12" fill="white" stroke="black" strokeWidth="1.4" /><line x1="120" y1="88" x2="120" y2="78" stroke="black" strokeWidth="1.2" /></>,
    IsoSign: <><rect x="70" y="60" width="72" height="20" fill={fill} stroke="black" strokeWidth="1.4" /><line x1="106" y1="80" x2="106" y2="114" stroke="black" strokeWidth="1.6" /><circle cx="80" cy="70" r="2" fill="white" /><circle cx="132" cy="70" r="2" fill="white" /></>,
    IsoHours: <><circle cx="106" cy="92" r="20" fill="white" stroke="black" strokeWidth="1.6" /><line x1="106" y1="92" x2="106" y2="80" stroke={fill} strokeWidth="2" /><line x1="106" y1="92" x2="118" y2="92" stroke={fill} strokeWidth="2" /><rect x="132" y="86" width="16" height="8" fill={fill} stroke="black" strokeWidth="1" /></>,
    IsoModify: <><rect x="66" y="74" width="76" height="30" fill="white" stroke="black" strokeWidth="1.4" /><path d="M80 88 H126" stroke={fill} strokeWidth="2" /><path d="M80 95 H114" stroke={fill} strokeWidth="2" /><circle cx="74" cy="84" r="3" fill={fill} /></>,
    IsoBuildStart: <><path d="M66 112 L92 86 L106 98 L136 68" stroke={fill} strokeWidth="3" fill="none" /><circle cx="136" cy="68" r="4" fill={fill} /><rect x="56" y="72" width="10" height="34" fill="white" stroke="black" strokeWidth="1.2" /></>,
    IsoLookup: <><circle cx="94" cy="92" r="16" fill="white" stroke="black" strokeWidth="1.6" /><line x1="106" y1="104" x2="124" y2="122" stroke="black" strokeWidth="2" /><circle cx="94" cy="92" r="6" fill={fill} stroke="black" strokeWidth="1.2" /></>,
    IsoTalk: <><rect x="66" y="76" width="58" height="24" fill="white" stroke="black" strokeWidth="1.4" /><path d="M82 100 L76 112 L92 100" fill="white" stroke="black" strokeWidth="1.4" /><circle cx="84" cy="88" r="2.2" fill={fill} /><circle cx="94" cy="88" r="2.2" fill={fill} /><circle cx="104" cy="88" r="2.2" fill={fill} /></>,
    IsoStrata: <><rect x="66" y="64" width="20" height="44" fill={fill} stroke="black" strokeWidth="1.4" /><rect x="90" y="72" width="20" height="36" fill="white" stroke="black" strokeWidth="1.4" /><rect x="114" y="80" width="20" height="28" fill="#dbeafe" stroke="black" strokeWidth="1.4" /></>
  };

  return <BaseIso label={label} accent={accent}>{featureByName[name] ?? featureByName.IsoBuild}</BaseIso>;
};
